export interface StockInfo {
  stock_id: string
  stock_name: string
  industry_category: string
  type: string
  date: string
}

export interface StockRevenue {
  date: string
  stock_id: string
  country: string
  revenue: number
  revenue_month: number
  revenue_year: number
}