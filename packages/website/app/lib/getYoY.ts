import { StockRevenue } from "@/types/stock";

// 年增率计算

function getYoY(
  current: StockRevenue,
  revenueMap: Map<string, Map<string, Map<number, StockRevenue>>>,
) {
  const stockMap = revenueMap.get(current.stock_id);
  if (!stockMap) return null;
  const month = current.date.slice(5, 7);
  const year = Number(current.date.slice(0, 4));
  const prev = stockMap.get(month)?.get(year - 1);
  if (!prev || prev.revenue === 0) return null;
  return ((current.revenue - prev.revenue) / prev.revenue) * 100;
}

export default getYoY;
