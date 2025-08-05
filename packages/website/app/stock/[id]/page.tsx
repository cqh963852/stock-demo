import { RevenueChart } from "@/app/components/RevenueChart";
import RevenueTable from "@/app/components/RevenueTable";
import mockData from "@/app/mock/mockData";
import Paper from "@mui/material/Paper";
import getRevenueStats from "@/app/lib/getRevenueStats";

export default function Page() {
  const stats = getRevenueStats(mockData);
  return (
    <Paper
      style={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div style={{ maxWidth: "900px" }}>
        <Paper></Paper>
        <Paper>
          <RevenueChart data={stats} />
        </Paper>

        <Paper style={{ marginTop: 16 }}>
          <RevenueTable data={stats} />
        </Paper>
      </div>
    </Paper>
  );
}
