import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { getAdmin, postAdmin, putAdmin, deleteAdmin } from "../../api/admin";

type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
};

const initial: Item[] = [
  {
    id: "KBQ-001",
    name: "Prime Galbi",
    category: "BBQ",
    price: 32.5,
    isAvailable: true,
  },
  {
    id: "KBQ-003",
    name: "Kimchi Jjigae",
    category: "Sides",
    price: 14,
    isAvailable: true,
  },
];

export default function MenuManagementPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Item[]>(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);

  const handleSave = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdmin("/menu");
        if (Array.isArray(res?.items)) setRows(res.items);
      } catch {}
    })();
  }, []);

  return (
    <AdminLayout title="Admin · Menu" onNav={(p) => navigate(p)} active="menu">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Menu Management</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Item
        </Button>
      </Box>

      <Paper
        sx={{
          backgroundColor: (t) => t.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: (t) => t.palette.action.hover }}>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Name
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Category
              </TableCell>
              <TableCell
                sx={{ color: (t) => t.palette.primary.main }}
                align="right"
              >
                Price
              </TableCell>
              <TableCell sx={{ color: (t) => t.palette.primary.main }}>
                Availability
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
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.category}</TableCell>
                <TableCell align="right">${r.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={r.isAvailable ? "Available" : "Sold Out"}
                    color={r.isAvailable ? "secondary" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      setEditing(r);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button size="small" variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editing ? "Edit Item" : "Add Item"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                defaultValue={editing?.name ?? ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                defaultValue={editing?.category ?? ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                defaultValue={editing?.price ?? ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" color="primary">
                Upload Image
                <input hidden type="file" accept="image/*" />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch defaultChecked={editing?.isAvailable ?? true} />
                }
                label="Available"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
