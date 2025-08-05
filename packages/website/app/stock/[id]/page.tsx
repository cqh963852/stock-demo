import { RevenueChart } from "@/app/components/RevenueChart";
import RevenueTable from "@/app/components/RevenueTable";
import mockData from "@/app/mock/mockData";
import Paper from "@mui/material/Paper";

export default function Page() {
  return (
    <div>
      <Paper></Paper>
      <Paper>
        <RevenueChart data={mockData} />
      </Paper>
      <Paper>
        <RevenueTable data={mockData} />
      </Paper>
    </div>
  );
}
