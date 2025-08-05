// vitest 单元测试
import { describe, it, expect } from "vitest";
import getRevenueStats from "./getRevenueStats";
import mockData from "../mock/mockData";

describe("getRevenueStats", () => {
  it("正常计算同比", () => {
    const stats = getRevenueStats(mockData);
    // 2024-01-31 与 2023-01-31 同 stock_id
    const value2024 = stats.find((s) => s.date === "2024-02-29");
    const value2023 = stats.find((s) => s.date === "2023-02-28");

    expect(value2024?.yoy).toBeCloseTo(
      ((value2024!.revenue - value2023!.revenue) / value2023!.revenue) * 100,
    );
  });

  it("无去年同月数据时同比为 null", () => {
    const data = [
      {
        date: "2025-01-31",
        stock_id: "test",
        country: "CN",
        revenue: 100,
        revenue_month: 100,
        revenue_year: 100,
      },
    ];
    const stats = getRevenueStats(data);
    expect(stats[0].yoy).toBeNull();
  });

  it("去年同月 revenue 为 0 时同比为 null", () => {
    const data = [
      {
        date: "2024-01-31",
        stock_id: "test",
        country: "CN",
        revenue: 100,
        revenue_month: 100,
        revenue_year: 100,
      },
      {
        date: "2023-01-31",
        stock_id: "test",
        country: "CN",
        revenue: 0,
        revenue_month: 0,
        revenue_year: 0,
      },
    ];
    const stats = getRevenueStats(data);
    expect(stats[0].yoy).toBeNull();
  });
});
