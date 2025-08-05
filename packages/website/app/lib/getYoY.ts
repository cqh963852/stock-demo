import { StockRevenue } from "@/types/stock";

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

export default getYoY;
