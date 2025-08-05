"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import type { RevenueStats } from "../lib/getRevenueStats";

interface IProps {
  data: RevenueStats[];
}

interface ICustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
  }>;
  label?: string;
}

const CustomTooltip = (props: ICustomTooltipProps) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    const revenue = payload.find((p) => p.dataKey === "revenue")?.value;
    const yoy = payload.find((p) => p.dataKey === "yoy")?.value;
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: 8 }}>
        <div>年月：{label?.slice(0, 7)}</div>
        <div>营收：{revenue?.toLocaleString()} 千元</div>
        <div>
          年增率：
          {yoy !== null && yoy !== undefined ? `${yoy.toFixed(2)}%` : "无数据"}
        </div>
      </div>
    );
  }
  return null;
};

export const RevenueChart = (props: IProps) => {
  const { data } = props;
  // 千元单位
  const chartData = data.map((item) => ({
    ...item,
    revenue: item.revenue / 1000,
  }));

  console.log("Chart data:", chartData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          interval={0}
          tickFormatter={(v) => {
            return v.slice(5, 7) === "01" ? v.slice(0, 4) : "";
          }}
          minTickGap={20}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          label={{ value: "营收(千元)", angle: -90, position: "insideLeft" }}
          tickFormatter={(v) => v.toLocaleString()}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: "年增率(%)", angle: 90, position: "insideRight" }}
          domain={[-100, 100]}
          tickFormatter={(v) =>
            v !== null && v !== undefined ? `${v.toFixed(2)}%` : ""
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="revenue"
          name="营收"
          fill="#8884d8"
          barSize={24}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="yoy"
          name="年增率"
          stroke="#ff7300"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
