import { useRef, useState } from "react";
import { useOutsideClose } from "./useOutsideClose";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOutsideClose(open, () => setOpen(false), [
    btnRef as React.RefObject<HTMLElement>,
    panelRef as React.RefObject<HTMLElement>,
  ]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="h-10 w-10 rounded-full bg-gray-900 text-white text-sm font-semibold"
        aria-haspopup="menu"
        aria-expanded={open}
        title="User menu"
      >
        FM
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-56 rounded border bg-white shadow-sm"
          role="menu"
        >
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
            Account Settings
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}