import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getAdmin, putAdmin } from "../../api/admin";

type Row = {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
};

const initial: Row[] = [];

export default function UsersPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>(initial);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdmin("/users");
        if (Array.isArray(data?.users)) setRows(data.users);
      } catch {}
    })();
  }, []);

  return (
    <AdminLayout
      title="Admin · Users"
      onNav={(p) => navigate(p)}
      active="users"
    >
      <Paper
        sx={{
          backgroundColor: (t) => t.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ p: 2 }}>
          Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: (t) => t.palette.action.hover }}>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Username
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Email
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Role
              </TableCell>
              <TableCell
                sx={{ color: (t) => t.palette.primary.main }}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.username}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={r.role}
                    onChange={(e) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === r.id
                            ? { ...x, role: e.target.value as Row["role"] }
                            : x
                        )
                      )
                    }
                  >
                    <MenuItem value="user">user</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="primary">
                    Change Role
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </AdminLayout>
  );
}
