
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExpensePagination({
  currentPage,
  totalPages,
  onPageChange,
  firstItem,
  lastItem,
  totalItems,
}) {
  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4),
  );

  const endPage = Math.min(totalPages, startPage + 4);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  if (totalItems === 0) return null;

  const buttonClass =
    "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Expense pagination"
      className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <p className="text-center text-sm text-slate-500 sm:text-left">
        Showing{" "}
        <span className="font-semibold text-slate-800">
          {firstItem}–{lastItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-800">
          {totalItems}
        </span>{" "}
        expenses
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className={`${buttonClass} border-slate-200 text-slate-600 hover:bg-slate-50`}
        >
          <ChevronLeft size={17} />
        </button>

        {startPage > 1 && (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className={`${buttonClass} border-slate-200 text-slate-600 hover:bg-slate-50`}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-1 text-slate-400" aria-hidden="true">
                …
              </span>
            )}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={currentPage === page ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`${buttonClass} ${
              currentPage === page
                ? "border-[#07845B] bg-[#07845B] text-white shadow-sm"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 text-slate-400" aria-hidden="true">
                …
              </span>
            )}
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={`${buttonClass} border-slate-200 text-slate-600 hover:bg-slate-50`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className={`${buttonClass} border-slate-200 text-slate-600 hover:bg-slate-50`}
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </nav>
  );
}
