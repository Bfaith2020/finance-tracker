import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {

  // Function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#22c55e" : "#bbf7d0"; 
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-green-50 shadow-md rounded-lg p-2 border border-green-200">
          <p className="text-xs font-semibold text-green-800 mb-1">{payload[0].payload.category}</p>
          <p className="text-sm text-green-700">
            Amount: <span className="text-sm font-medium text-green-900">R{payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-green-50 mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#065f46" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#065f46" }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Bar
            dataKey="amount"
            fill="#22c55e"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "#065f46" }}
            activeStyle={{ fill: "#22c55e" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
