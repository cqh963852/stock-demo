import type { StockInfo } from "@/types/stock";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stockId = searchParams.get("stock_id") || "";

  try {
    // TODO: 替换为实际的API token
    const token = process.env.FINMIND_TOKEN || "your_token_here";
    const apiUrl = `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&token=${token}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`FinMind API请求失败: ${response.status}`);
    }

    const data = (await response.json()) as { data: StockInfo[] };
    const stocks = stockId
      ? data.data.filter((stock) => stock.stock_id === stockId)
      : data.data;

    return NextResponse.json(stocks);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "未知错误" },
      { status: 500 },
    );
  }
}
