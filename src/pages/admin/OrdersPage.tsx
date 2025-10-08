import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getAdmin, putAdmin } from "../../api/admin";

type Row = {
  id: string;
  customer: string;
  status: "Pending" | "Cooking" | "Done";
  amount: number;
  time: string;
};

const initial: Row[] = [
  {
    id: "KBQ-20251006-A1Z3X",
    customer: "Alex Kim",
    status: "Pending",
    amount: 84.53,
    time: "15:35",
  },
  {
    id: "KBQ-20251006-B2Y7Q",
    customer: "Min Lee",
    status: "Cooking",
    amount: 42.1,
    time: "15:30",
  },
  {
    id: "KBQ-20251006-C9P2M",
    customer: "Jane Park",
    status: "Done",
    amount: 21.9,
    time: "15:10",
  },
];

export default function OrdersPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>(initial);

  const colorFor = (s: Row["status"]) =>
    s === "Pending" ? "primary" : s === "Cooking" ? "secondary" : "success";

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdmin("/orders");
        if (Array.isArray(data?.orders)) setRows(data.orders);
      } catch {}
    })();
  }, []);

  return (
    <AdminLayout
      title="Admin · Orders"
      onNav={(p) => navigate(p)}
      active="orders"
    >
      <Paper
        sx={{
          backgroundColor: (t) => t.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ p: 2 }}>
          Orders
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: (t) => t.palette.action.hover }}>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                ID
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Customer
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Status
              </TableCell>
              <TableCell
                sx={{ color: (t) => t.palette.primary.main }}
                align="right"
              >
                Amount
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.customer}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={r.status}
                    onChange={(e) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === r.id
                            ? { ...x, status: e.target.value as Row["status"] }
                            : x
                        )
                      )
                    }
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Cooking">Cooking</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                  <Chip
                    label={r.status}
                    color={colorFor(r.status)}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </TableCell>
                <TableCell align="right">${r.amount.toFixed(2)}</TableCell>
                <TableCell>{r.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </AdminLayout>
  );
}
