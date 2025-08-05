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
import type { StockRevenue } from "@/types/stock";
import getYoY from "../lib/getYoY";

interface IProps {
  data: StockRevenue[];
}

function getChartData(data: StockRevenue[]) {
  // 按年月分组，计算年增率
  const map = new Map<string, StockRevenue>();
  data.forEach((item) => {
    map.set(item.date, item);
  });

  return data
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => {
      const [year, month] = item.date.split("-");
      const lastYearDate = `${Number(year) - 1}-${month}`;
      const lastYear = map.get(lastYearDate);
      const yoy = getYoY(item, data);

      return {
        date: item.date,
        year,
        month,
        revenue: item.revenue / 1000, // 千元
        yoy, // 百分比
      };
    });
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const revenue = payload.find((p: any) => p.dataKey === "revenue")?.value;
    const yoy = payload.find((p: any) => p.dataKey === "yoy")?.value;
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: 8 }}>
        <div>年月：{label}</div>
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
  const chartData = getChartData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => v.slice(0, 7)}
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
