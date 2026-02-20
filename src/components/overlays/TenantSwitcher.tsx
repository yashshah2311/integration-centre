import { useMemo, useRef, useState } from "react";
import { useOutsideClose } from "./useOutsideClose";

const TENANTS = [
  "ABC Group Ltd",
  "Swathy Corp 2",
  "All Hands Demo Limited",
  "All Blacks Organization",
  "Air New Zealand Ltd",
];

export function TenantSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(TENANTS[1]);
  const [q, setQ] = useState("");

  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOutsideClose(open, () => setOpen(false), [
    btnRef as React.RefObject<HTMLElement>,
    panelRef as React.RefObject<HTMLElement>,
  ]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return TENANTS;
    return TENANTS.filter((t) => t.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="h-10 px-3 rounded border text-sm bg-white hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {selected}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 rounded border bg-white shadow-sm p-3"
          role="menu"
        >
          <div className="text-xs text-gray-500 mb-2">Switch tenant</div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type to filter..."
            className="w-full h-9 rounded border px-3 text-sm"
          />

          <div className="mt-2 max-h-64 overflow-auto">
            {filtered.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelected(t);
                  setOpen(false);
                }}
                className={[
                  "w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100",
                  t === selected ? "bg-green-50 text-green-800" : "",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}