type Props = {
  open: boolean;
  title: string;
  body: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmModal({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
        >
          <span className="text-4xl leading-none">×</span>
        </button>

        <div className="p-10 md:p-12">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              <span className="text-2xl leading-none">×</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="mt-8 text-5xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>

          {/* Body */}
          <p className="mt-6 text-2xl text-gray-700 leading-relaxed max-w-3xl">
            {body}
          </p>

          {/* Actions */}
          <div className="mt-12 flex flex-col md:flex-row gap-6 md:gap-8">
            <button
              type="button"
              onClick={onCancel}
              className="h-16 md:h-20 w-full md:w-[420px] rounded-2xl border border-gray-200 bg-white text-2xl font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="h-16 md:h-20 w-full md:flex-1 rounded-2xl bg-red-500 text-2xl font-semibold text-white shadow-sm hover:bg-red-600"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}