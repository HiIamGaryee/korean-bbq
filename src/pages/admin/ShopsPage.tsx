import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getAdminShops, setAdminShopStatus } from "../../api/shops";

type Shop = { id: string; name: string; isOpen: boolean };

export default function ShopsPage() {
  const navigate = useNavigate();
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdminShops();
        setShops(data.shops);
      } catch {}
    })();
  }, []);

  const updateStatus = async (id: string, isOpen: boolean) => {
    setShops((prev) => prev.map((s) => (s.id === id ? { ...s, isOpen } : s)));
    try {
      await setAdminShopStatus(id, isOpen);
    } catch {}
  };

  return (
    <AdminLayout
      title="Admin · Shops"
      onNav={(p) => navigate(p)}
      active="shops"
    >
      <Paper
        sx={{
          backgroundColor: (t) => t.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ p: 2 }}>
          Shops
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: (t) => t.palette.action.hover }}>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Name
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>{s.name}</TableCell>
                <TableCell>
                  <RadioGroup
                    row
                    value={s.isOpen ? "open" : "closed"}
                    onChange={(e) =>
                      updateStatus(s.id, e.target.value === "open")
                    }
                  >
                    <FormControlLabel
                      value="open"
                      control={<Radio />}
                      label="Open"
                    />
                    <FormControlLabel
                      value="closed"
                      control={<Radio />}
                      label="Closed"
                    />
                  </RadioGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </AdminLayout>
  );
}
