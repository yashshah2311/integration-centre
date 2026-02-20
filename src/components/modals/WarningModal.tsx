type Props = {
  open: boolean;
  title: string;
  body: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function WarningModal({
  open,
  title,
  body,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded border bg-white shadow-sm">
        <div className="p-5">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-gray-700 mt-2">{body}</div>

          <div className="flex justify-end gap-3 mt-6">
            <button className="h-10 px-4 rounded border" onClick={onCancel}>
              {cancelLabel}
            </button>
            <button className="h-10 px-4 rounded bg-gray-900 text-white" onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}