import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

type SummaryItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  thumb?: string;
};

const initialSummary: SummaryItem[] = [];

export default function PaymentPage() {
  const [items] = useState<SummaryItem[]>(initialSummary);
  const [method, setMethod] = useState<"FPX" | "E-wallet" | "Credit Card">(
    "FPX"
  );
  const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0);
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = subtotal + tax;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: "#1A1A1A",
              borderRadius: 2,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            {items.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No items to pay for yet.
              </Typography>
            )}
            {items.map((i, idx) => (
              <Box key={i.id}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, py: 1 }}
                >
                  <Avatar
                    variant="rounded"
                    src={i.thumb}
                    sx={{ width: 56, height: 56, borderRadius: 1 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">{i.name}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      x{i.qty}
                    </Typography>
                  </Box>
                  <Typography>
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "USD",
                    }).format(i.qty * i.price)}
                  </Typography>
                </Box>
                {idx < items.length - 1 && (
                  <Divider sx={{ borderColor: "#2E2E2E" }} />
                )}
              </Box>
            ))}
          </Paper>

          <Paper
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "#1A1A1A",
              borderRadius: 2,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Payment Method
            </Typography>
            <RadioGroup
              row
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
            >
              <FormControlLabel value="FPX" control={<Radio />} label="FPX" />
              <FormControlLabel
                value="E-wallet"
                control={<Radio />}
                label="E-wallet"
              />
              <FormControlLabel
                value="Credit Card"
                control={<Radio />}
                label="Credit Card"
              />
            </RadioGroup>
          </Paper>

          <Paper
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "#1A1A1A",
              borderRadius: 2,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Delivery Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Full Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Phone" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address Line 1"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address Line 2"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="City" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="State" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Postal Code" variant="outlined" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 2,
              position: "sticky",
              top: 16,
              backgroundColor: "#1A1A1A",
              borderRadius: 2,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Payment Summary
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography>
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "USD",
                }).format(subtotal)}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">Tax</Typography>
              <Typography>
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "USD",
                }).format(tax)}
              </Typography>
            </Box>
            <Divider sx={{ my: 1, borderColor: "#2E2E2E" }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Total</Typography>
              <Typography fontWeight={700}>
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                borderRadius: 50,
                transition: "box-shadow .2s ease",
                "&:hover": { boxShadow: "0 0 10px rgba(255,106,0,0.5)" },
              }}
            >
              Pay Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
