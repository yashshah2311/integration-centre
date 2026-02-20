import { useEffect, useMemo, useState } from "react";
import { TILES } from "./mockData";
import type { Connection } from "./types";
import { deleteConnection, getConnections, updateConnection } from "./service";
import { ConfirmModal } from "../../components/modals/ConfirmModal";
import { WarningModal } from "../../components/modals/WarningModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPencil,
  faTrash,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

export function IntegrationsPage() {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [deleteTarget, setDeleteTarget] = useState<Connection | null>(null);
  const [editTarget, setEditTarget] = useState<Connection | null>(null);
  const PROVIDER_ICON: Record<string, string> = {
    quicksight: "/logos/quicksight.png",
    kafka: "/logos/kafka.png",
    powerbi: "/logos/powerbi.png",
    zapier: "/logos/zapier.png",
    tableau: "/logos/tableau.png",
    measurabl: "/logos/measurabl.png",
  };

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

  function SourcePill({ source }: { source: string }) {
    const isCarbon = source.toLowerCase() === "carbon";
    return (
      <span
        className={[
          "inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold border",
          isCarbon
            ? "bg-[#FFF4D6] text-[#C07A00] border-[#FFDFA0]"
            : "bg-[#E9FBF6] text-[#1B8C74] border-[#B9F0E3]",
        ].join(" ")}
      >
        {source}
      </span>
    );
  }

  function IconSquare({ src, alt }: { src: string; alt: string }) {
    return (
      <div className="h-10 w-10 rounded-md bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  function Pager({
    page,
    totalPages,
    onPage,
  }: {
    page: number;
    totalPages: number;
    onPage: (p: number) => void;
  }) {
    const maxButtons = 5;
    const pages: (number | "...")[] = [];

    const start = Math.max(
      1,
      Math.min(page - 2, totalPages - (maxButtons - 1)),
    );
    const end = Math.min(totalPages, start + (maxButtons - 1));

    for (let p = start; p <= end; p++) pages.push(p);
    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return (
      <div className="flex items-center gap-2">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-2 text-gray-500">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={[
                "h-10 w-10 rounded-lg border border-gray-200 bg-white text-sm",
                p === page
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {p}
            </button>
          ),
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tiles */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Choose a Service to Connect
        </h2>
        <p className="text-sm text-gray-500">
          Connect BraveGen to other tools you use.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
          {TILES.map((t) => (
            <div
              key={t.provider}
              className="rounded-xl border border-gray-400 bg-gray-200 p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-200">
                  <img
                    src={t.logo}
                    alt={`${t.title} logo`}
                    className="h-9 w-9 object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="text-lg font-semibold text-gray-900">
                    {t.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 leading-snug">
                    {t.description}
                  </div>

                  <button
                    className="mt-4 inline-flex h-9 items-center rounded-md bg-[#111827] px-4 text-sm font-medium text-white hover:bg-black"
                    onClick={() => alert(`Mock connect: ${t.title}`)}
                  >
                    Add Connection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Table */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-5">
          <div className="text-lg font-semibold text-gray-900">
            Existing Connections
          </div>

          {/* Search */}
          <div className="mt-3 relative w-full md:w-[520px]">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Integration or Name"
              className="w-full h-11 rounded-lg border border-gray-200 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        <div className="border-t border-gray-200" />
        <div className="p-5">
          {loading && <div className="text-sm text-gray-600">Loading…</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}

          {!loading && !error && (
            <>
              <div className="overflow-auto rounded-xl border border-gray-200">
                <table className="min-w-[1100px] w-full text-sm">
                  <thead className="bg-white">
                    <tr className="text-gray-600 border-b border-gray-200">
                      <th className="py-4 px-4 font-semibold">
                        <div className="inline-flex items-center gap-2">
                          Integration
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            className="text-gray-400 text-xs"
                          />
                        </div>
                      </th>
                      <th className="py-4 px-4 font-semibold">Name</th>
                      <th className="py-4 px-4 font-semibold">Source</th>
                      <th className="py-4 px-4 font-semibold">Entity/Group</th>
                      <th className="py-4 px-4 font-semibold">Interval</th>
                      <th className="py-4 px-4 font-semibold">Connector URL</th>
                      <th className="py-4 px-4 font-semibold">Instructions</th>
                      <th className="py-4 px-4 font-semibold text-right"> </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        {/* Integration (logo + label) */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3 min-w-[240px]">
                            <IconSquare
                              src={PROVIDER_ICON[c.provider] ?? "/vite.svg"}
                              alt={c.integrationLabel}
                            />
                            <span className="text-gray-900 truncate max-w-[160px]">
                              {c.integrationLabel}
                            </span>
                          </div>
                        </td>

                        {/* Name */}
                        <td className="py-4 px-4">
                          <button className="text-[#2AA9D8] font-semibold hover:underline">
                            {c.name}
                          </button>
                        </td>

                        {/* Source */}
                        <td className="py-4 px-4">
                          <SourcePill source={c.source} />
                        </td>

                        {/* Entity/Group */}
                        <td className="py-4 px-4 text-gray-700 truncate max-w-[260px]">
                          {c.entityGroup}
                        </td>

                        {/* Interval */}
                        <td className="py-4 px-4 text-gray-700">
                          {c.interval}
                        </td>

                        {/* Connector URL */}
                        <td className="py-4 px-4">
                          <button
                            className="text-[#2AA9D8] font-semibold hover:underline"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                "mock://url",
                              )
                            }
                          >
                            {c.connectorUrlLabel}
                          </button>
                        </td>

                        {/* Instructions */}
                        <td className="py-4 px-4">
                          <button
                            className="text-[#2AA9D8] font-semibold hover:underline inline-flex items-center gap-2"
                            onClick={() => alert("Mock instructions")}
                          >
                            {c.instructionsLabel}
                            <span className="text-[#2AA9D8]">↗</span>
                          </button>
                        </td>

                        {/* pencil + trash */}
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-3">
                            <button
                              className="h-10 w-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
                              onClick={() => setEditTarget(c)}
                              aria-label="Edit"
                            >
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="text-gray-600"
                              />
                            </button>

                            <button
                              className="h-10 w-10 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center"
                              onClick={() => setDeleteTarget(c)}
                              aria-label="Delete"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-white"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {rows.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="py-10 text-center text-gray-600"
                        >
                          No results
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination like screenshot */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  className="h-10 px-5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-40"
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ← Previous
                </button>

                <Pager
                  page={pageSafe}
                  totalPages={totalPages}
                  onPage={(p) => setPage(p)}
                />

                <button
                  className="h-10 px-5 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-40"
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Modals */}
      <ConfirmModal
        open={!!deleteTarget}
        title={
          deleteTarget
            ? `Remove "${deleteTarget.name}" Connection?`
            : "Remove Connection?"
        }
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