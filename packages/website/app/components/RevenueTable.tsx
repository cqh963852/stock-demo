"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import type { StockRevenue } from "../../types/stock";

// 工具函数：千位分隔
function formatNumber(num: number) {
  return new Intl.NumberFormat("zh-CN").format(num);
}

// 工具函数：百分比格式化
function formatPercent(num: number) {
  return num === null || isNaN(num) ? "-" : `${num.toFixed(2)} %`;
}

// 年增率计算
function getYoY(current: StockRevenue, all: StockRevenue[]) {
  // 查找去年同月
  const prev = all.find(
    (item) =>
      item.stock_id === current.stock_id &&
      item.date.slice(4, 6) === current.date.slice(4, 6) && // 月份相同
      Number(item.date.slice(0, 4)) === Number(current.date.slice(0, 4)) - 1, // 年份-1
  );
  if (!prev || prev.revenue === 0) return null;
  return ((current.revenue - prev.revenue) / prev.revenue) * 100;
}

interface IProps {
  data: StockRevenue[];
}

const RevenueTableRow: React.FC<{
  row: StockRevenue;
  data: StockRevenue[];
}> = ({ row, data }) => {
  const yoy = React.useMemo(() => getYoY(row, data), [row, data]);
  return (
    <TableRow key={row.date}>
      <TableCell>{row.date}</TableCell>
      <TableCell align="right">{formatNumber(row.revenue)}</TableCell>
      <TableCell align="right">
        {yoy === null ? "-" : formatPercent(yoy)}
      </TableCell>
    </TableRow>
  );
};

const RevenueTable = (props: IProps) => {
  const { data } = props;
  const sorted = React.useMemo(
    () => [...data].sort((a, b) => b.date.localeCompare(a.date)),
    [data],
  );

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer component={Paper} sx={{ minWidth: 480 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>年度月份</TableCell>
              <TableCell align="right">每月营收</TableCell>
              <TableCell align="right">单月营收年增率</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row) => (
              <RevenueTableRow key={row.date} row={row} data={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RevenueTable;
