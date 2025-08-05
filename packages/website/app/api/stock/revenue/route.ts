import type { StockRevenue } from "@/types/stock";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stockId = searchParams.get("stock_id") || "";
  const startDate = searchParams.get("start_date") || "";
  const endDate = searchParams.get("end_date") || "";

  try {
    // TODO: 替换为实际的API token
    const token = process.env.FINMIND_TOKEN || "your_token_here";
    let apiUrl = `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&token=${token}`;

    if (stockId) apiUrl += `&data_id=${stockId}`;
    if (startDate) apiUrl += `&start_date=${startDate}`;
    if (endDate) apiUrl += `&end_date=${endDate}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`FinMind API请求失败: ${response.status}`);
    }

    const data = (await response.json()) as { data: StockRevenue[] };
    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "未知错误" },
      { status: 500 },
    );
  }
}
