import { useEffect } from "react";

export function useOutsideClose(
  isOpen: boolean,
  onClose: () => void,
  refs: Array<React.RefObject<HTMLElement>>,
) {
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      const clickedInside = refs.some(
        (r) => r.current && r.current.contains(target),
      );
      if (!clickedInside) onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [isOpen, onClose, refs]);
}
