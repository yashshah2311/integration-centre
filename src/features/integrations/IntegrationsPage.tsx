import { useEffect, useMemo, useState } from "react";
import { TILES } from "./mockData";
import type { Connection } from "./types";
import { deleteConnection, getConnections, updateConnection } from "./service";
import { ConfirmModal } from "../../components/modals/ConfirmModal";
import { WarningModal } from "../../components/modals/WarningModal";

export function IntegrationsPage() {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [deleteTarget, setDeleteTarget] = useState<Connection | null>(null);
  const [editTarget, setEditTarget] = useState<Connection | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getConnections();
        if (alive) setConnections(data);
      } catch {
        if (alive) setError("Failed to load connections");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return connections;
    return connections.filter((c) =>
      `${c.integrationLabel} ${c.name} ${c.source} ${c.entityGroup}`
        .toLowerCase()
        .includes(q)
    );
  }, [connections, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);

  const rows = useMemo(() => {
    const start = (pageSafe - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSafe]);

  async function handleDeleteConfirmed() {
    if (!deleteTarget) return;
    await deleteConnection(deleteTarget.id);
    setConnections((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  async function handleEditConfirmed() {
    if (!editTarget) return;
    const updated = await updateConnection(editTarget.id, {
      interval: editTarget.interval === "Monthly" ? "Yearly" : "Monthly",
    });
    setConnections((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditTarget(null);
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-xl font-semibold">Integrations</h1>
        <p className="text-sm text-gray-600 mt-1">
          Choose a service to connect or manage existing connections.
        </p>
      </section>

      {/* Tiles */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Choose a Service to Connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TILES.map((t) => (
            <button
              key={t.provider}
              className="text-left rounded border bg-white p-4 hover:bg-gray-50"
              onClick={() => alert(`Mock connect: ${t.title}`)}
            >
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-600 mt-1">{t.description}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="rounded border bg-white">
        <div className="p-4 border-b">
          <div className="font-semibold">Existing Connections</div>
          <div className="mt-3">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Integration or Name"
              className="w-full md:w-96 h-10 rounded border px-3 text-sm"
            />
          </div>
        </div>

        <div className="p-4">
          {loading && <div className="text-sm text-gray-600">Loading…</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}

          {!loading && !error && (
            <>
              <div className="overflow-auto">
                <table className="min-w-[900px] w-full text-sm">
                  <thead className="text-left text-gray-600">
                    <tr className="border-b">
                      <th className="py-2 pr-3">Integration</th>
                      <th className="py-2 pr-3">Name</th>
                      <th className="py-2 pr-3">Source</th>
                      <th className="py-2 pr-3">Entity/Group</th>
                      <th className="py-2 pr-3">Interval</th>
                      <th className="py-2 pr-3">Connector URL</th>
                      <th className="py-2 pr-3">Instructions</th>
                      <th className="py-2 pr-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((c) => (
                      <tr key={c.id} className="border-b last:border-b-0">
                        <td className="py-2 pr-3">{c.integrationLabel}</td>
                        <td className="py-2 pr-3">{c.name}</td>
                        <td className="py-2 pr-3">{c.source}</td>
                        <td className="py-2 pr-3">{c.entityGroup}</td>
                        <td className="py-2 pr-3">{c.interval}</td>
                        <td className="py-2 pr-3">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => navigator.clipboard.writeText("mock://connector-url")}
                          >
                            {c.connectorUrlLabel}
                          </button>
                        </td>
                        <td className="py-2 pr-3">
                          <button className="text-blue-600 hover:underline" onClick={() => alert("Mock instructions")}>
                            {c.instructionsLabel}
                          </button>
                        </td>
                        <td className="py-2 pr-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 rounded border hover:bg-gray-50"
                              onClick={() => setEditTarget(c)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-2 py-1 rounded border hover:bg-gray-50"
                              onClick={() => setDeleteTarget(c)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-gray-600">
                          No results
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  className="h-9 px-3 rounded border disabled:opacity-50"
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>

                <div className="text-sm text-gray-700">
                  Page {pageSafe} of {totalPages}
                </div>

                <button
                  className="h-9 px-3 rounded border disabled:opacity-50"
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Modals */}
      <ConfirmModal
        open={!!deleteTarget}
        title={deleteTarget ? `Remove "${deleteTarget.name}" Connection?` : "Remove Connection?"}
        body={
          deleteTarget
            ? `Are you sure you want to remove ${deleteTarget.integrationLabel} "${deleteTarget.name}" connection?`
            : ""
        }
        cancelLabel="Undo"
        confirmLabel="Remove"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirmed}
      />

      <WarningModal
        open={!!editTarget}
        title="Change to Existing Connection"
        body="Changes may disrupt functionality and impact data flow. Are you sure you want to make changes?"
        cancelLabel="Undo"
        confirmLabel="Save Changes"
        onCancel={() => setEditTarget(null)}
        onConfirm={handleEditConfirmed}
      />
    </div>
  );
}