import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  notes, // add notes prop
}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-all duration-200">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-green-700 bg-green-200 rounded-full border border-green-300">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-green-700 font-medium">{title}</p>
          <p className="text-xs text-green-600 mt-1">{date}</p>
          {notes && (
            <p className="text-xs text-green-700 mt-1 italic opacity-80">Note: {notes}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button className="text-green-800 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={onDelete}>
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${
              type === "income"
                ? "bg-green-900 text-green-100"
                : "bg-green-200 text-green-900"
            }`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} R{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;

