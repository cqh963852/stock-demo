import { StockRevenue } from "@/types/stock";
import getYoY from "./getYoY";

export interface RevenueStats {
  date: string;
  revenue: number;
  yoy: number | null;
}

export function getRevenueStats(data: StockRevenue[]): RevenueStats[] {
  const revenueMap = new Map<string, Map<string, Map<number, StockRevenue>>>();

  for (const item of data) {
    if (!revenueMap.has(item.stock_id)) {
      revenueMap.set(item.stock_id, new Map());
    }
    const stockMap = revenueMap.get(item.stock_id)!;
    const month = item.date.slice(5, 7);
    const year = Number(item.date.slice(0, 4));
    if (!stockMap.has(month)) {
      stockMap.set(month, new Map());
    }
    stockMap.get(month)!.set(year, item);
  }

  // 按日期升序
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.map((item) => {
    const yoy = getYoY(item, revenueMap);

    return {
      date: item.date,
      revenue: item.revenue,
      yoy,
    };
  });
}

export default getRevenueStats;
