import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-green-50 p-6 rounded-2xl shadow-md shadow-green-100 border border-green-200/50">
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-green-700 mb-1">{label}</h6>
        <span className="text-[22px] text-green-900">R{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
