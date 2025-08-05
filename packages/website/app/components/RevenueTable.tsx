"use client";

import * as React from "react";

import type { StockRevenue } from "../../types/stock";
import getYoY from "../lib/getYoY";

// 工具函数：千位分隔
function formatNumber(num: number) {
  return new Intl.NumberFormat("zh-CN").format(num);
}

// 工具函数：百分比格式化
function formatPercent(num: number) {
  return num === null || isNaN(num) ? "-" : `${num.toFixed(2)} %`;
}

interface IProps {
  data: StockRevenue[];
}

/* 已废弃，无需单独行组件 */

const RevenueTable = (props: IProps) => {
  const { data } = props;
  const sorted = React.useMemo(
    () => [...data].sort((a, b) => b.date.localeCompare(a.date)),
    [data],
  );

  // 转置数据
  const monthList = sorted.map((row) => row.date);
  const revenueList = sorted.map((row) =>
    typeof row.revenue === "number" && !isNaN(row.revenue)
      ? formatNumber(row.revenue)
      : "-",
  );
  const yoyList = sorted.map((row) => {
    const yoy = getYoY(row, sorted);
    return typeof yoy === "number" ? formatPercent(yoy) : "-";
  });

  const colCount = sorted.length;

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "auto",
        border: "1px solid #eee",
        borderRadius: 6,
      }}
    >
      <table style={{ minWidth: 600, borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                background: "#fafafa",
                zIndex: 2,
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #eee",
                minWidth: 120,
                width: 120,
              }}
            >
              年度月份
            </th>
            {colCount === 0 ? (
              <td
                style={{ textAlign: "center", padding: "24px", color: "#888" }}
              >
                暂无数据
              </td>
            ) : (
              monthList.map((v, idx) => (
                <td
                  key={idx}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #f5f5f5",
                    minWidth: 100,
                    textAlign: "center",
                  }}
                >
                  {v}
                </td>
              ))
            )}
          </tr>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                background: "#fafafa",
                zIndex: 2,
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #eee",
                minWidth: 120,
                width: 120,
              }}
            >
              每月营收
            </th>
            {colCount === 0 ? (
              <td
                style={{ textAlign: "center", padding: "24px", color: "#888" }}
              >
                暂无数据
              </td>
            ) : (
              revenueList.map((v, idx) => (
                <td
                  key={idx}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #f5f5f5",
                    minWidth: 100,
                    textAlign: "right",
                  }}
                >
                  {v}
                </td>
              ))
            )}
          </tr>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                background: "#fafafa",
                zIndex: 2,
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #eee",
                minWidth: 120,
                width: 120,
              }}
            >
              单月营收年增率
            </th>
            {colCount === 0 ? (
              <td
                style={{ textAlign: "center", padding: "24px", color: "#888" }}
              >
                暂无数据
              </td>
            ) : (
              yoyList.map((v, idx) => (
                <td
                  key={idx}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #f5f5f5",
                    minWidth: 100,
                    textAlign: "right",
                  }}
                >
                  {v}
                </td>
              ))
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RevenueTable;
