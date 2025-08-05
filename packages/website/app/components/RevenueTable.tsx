"use client";

import * as React from "react";

import type { RevenueStats } from "../lib/getRevenueStats";

// 工具函数：千位分隔
function formatNumber(num: number) {
  return new Intl.NumberFormat("zh-CN").format(num);
}

// 工具函数：百分比格式化
function formatPercent(num: number) {
  return num === null || isNaN(num) ? "-" : `${num.toFixed(2)} %`;
}

interface IProps {
  data: RevenueStats[];
}

/* 已废弃，无需单独行组件 */

const RevenueTable = (props: IProps) => {
  const { data } = props;
  // 已按日期升序，表格需倒序展示

  // 转置数据
  const monthList = data.map((row) => row.date);

  const yoyList = data.map((row) =>
    typeof row.yoy === "number" ? formatPercent(row.yoy) : "-",
  );

  const colCount = data.length;

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
              data.map((v, idx) => (
                <td
                  key={idx}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #f5f5f5",
                    minWidth: 100,
                    textAlign: "right",
                  }}
                >
                  {formatNumber(v.revenue)}
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
