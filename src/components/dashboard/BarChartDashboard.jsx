import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const BarChartDashboard = ({ budgetList }) => {
  // Handle case where no data is available
  if (!budgetList || budgetList.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="border rounded-2xl sm:p-5 w-full my-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={budgetList} margin={{ top: 7 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" fill="#4845d2" stackId={"a"} />
          <Bar dataKey="amount" fill="#c3c2ff" stackId={"a"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
