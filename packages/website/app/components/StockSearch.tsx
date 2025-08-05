"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, TextField, Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import type { StockInfo } from "../../types/stock";

const mockStocks: StockInfo[] = [
  {
    stock_id: "600000",
    stock_name: "浦发银行",
    industry_category: "银行",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "000001",
    stock_name: "平安银行",
    industry_category: "银行",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "600519",
    stock_name: "贵州茅台",
    industry_category: "白酒",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "000333",
    stock_name: "美的集团",
    industry_category: "家电",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "300750",
    stock_name: "宁德时代",
    industry_category: "新能源",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "601318",
    stock_name: "中国平安",
    industry_category: "保险",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "002594",
    stock_name: "比亚迪",
    industry_category: "汽车",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "600036",
    stock_name: "招商银行",
    industry_category: "银行",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "000858",
    stock_name: "五粮液",
    industry_category: "白酒",
    type: "A股",
    date: "2025-01-01",
  },
  {
    stock_id: "601166",
    stock_name: "兴业银行",
    industry_category: "银行",
    type: "A股",
    date: "2025-01-01",
  },
];

export interface StockSearchProps {
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
}

export default function StockSearch({
  themeMode,
  onToggleTheme,
}: StockSearchProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  // 按名称A-Z排序
  const sortedStocks = useMemo(
    () =>
      [...mockStocks].sort((a, b) =>
        a.stock_name.localeCompare(b.stock_name, "zh-CN"),
      ),
    [],
  );

  // 搜索过滤
  const filteredStocks = useMemo(() => {
    if (!inputValue) return sortedStocks;
    return sortedStocks.filter(
      (stock) =>
        stock.stock_name.startsWith(inputValue) ||
        stock.stock_id.startsWith(inputValue),
    );
  }, [inputValue, sortedStocks]);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{ width: 400, margin: "32px auto" }}
    >
      <Autocomplete
        options={filteredStocks.slice(0, 10)}
        getOptionLabel={(option) =>
          `${option.stock_name}（${option.stock_id}）`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="搜索股票名称或编码"
            variant="outlined"
          />
        )}
        onInputChange={(_, value) => setInputValue(value)}
        onChange={(_, value) => {
          if (value) {
            router.push(`/stock/${value.stock_id}`);
          }
        }}
        sx={{ flex: 1 }}
        noOptionsText="未找到相关股票"
      />
      <IconButton onClick={onToggleTheme} color="inherit">
        {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
