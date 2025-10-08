import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Divider,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Stack,
  Link as MuiLink,
  Collapse,
  FormHelperText,
  Card,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LanguageIcon from "@mui/icons-material/Language";
import * as yup from "yup";

// ---- Types ----
type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  thumb?: string;
};
type OrderType = "Pickup" | "Delivery" | "Dine-in";
type Shop = { id: string; name: string; isOpen: boolean };
type Voucher =
  | {
      id: "V250_10";
      label: "RM250 满减 RM10";
      type: "threshold_minus";
      min: number;
      off: number;
    }
  | {
      id: "FREE_DELIVERY_350";
      label: "满 RM350 免运费";
      type: "free_delivery";
      min: number;
    }
  | {
      id: "NEW_USER_10";
      label: "新用户立减 RM10";
      type: "new_user_minus";
      off: number;
    };

const initialCart: CartItem[] = [
  {
    id: "1",
    name: "Signature Pork Belly",
    price: 38,
    qty: 2,
    thumb:
      "https://images.unsplash.com/photo-1601315483607-62a74c5c3a2f?w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Bulgogi Beef",
    price: 42,
    qty: 1,
    thumb:
      "https://images.unsplash.com/photo-1569058242261-8235a82909f8?w=400&auto=format&fit=crop",
  },
];

const mockShops: Shop[] = [
  { id: "s1", name: "SanSan BBQ — KLCC", isOpen: true },
  { id: "s2", name: "SanSan BBQ — Bangsar", isOpen: false },
  { id: "s3", name: "SanSan BBQ — Subang", isOpen: true },
  { id: "s4", name: "SanSan BBQ — PJ", isOpen: false },
  { id: "s5", name: "SanSan BBQ — Cheras", isOpen: true },
];

const vouchers: Voucher[] = [
  {
    id: "V250_10",
    label: "RM250 满减 RM10",
    type: "threshold_minus",
    min: 250,
    off: 10,
  },
  {
    id: "FREE_DELIVERY_350",
    label: "满 RM350 免运费",
    type: "free_delivery",
    min: 350,
  },
  {
    id: "NEW_USER_10",
    label: "新用户立减 RM10",
    type: "new_user_minus",
    off: 10,
  },
];

// ---- Validation ----
const deliverySchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  phone: yup
    .string()
    .matches(/^\+?6?01[0-46-9]-?[0-9]{7,8}$/, "Enter valid MY phone")
    .required("Phone is required"),
  line1: yup.string().required("Address Line 1 is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postcode: yup
    .string()
    .matches(/^[0-9]{5}$/, "Postcode must be 5 digits")
    .required("Postcode is required"),
});

// ---- Component ----
export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [orderType, setOrderType] = useState<OrderType>("Pickup");
  const [shops, setShops] = useState<Shop[]>([]);
  const [pickupShopId, setPickupShopId] = useState<string>("");
  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postcode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [voucherOpen, setVoucherOpen] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState<
    Voucher["id"] | ""
  >("");
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "online_banking" | "qr" | "card" | ""
  >("");
  const [bankLinkOpened, setBankLinkOpened] = useState(false);

  // ---- Derived totals ----
  const subtotal = useMemo(
    () => cart.reduce((acc, i) => acc + i.price * i.qty, 0),
    [cart]
  );

  const rawDeliveryFee = useMemo(() => {
    if (orderType !== "Delivery") return 0;
    // User rule: base RM10, if subtotal >= 200 -> RM15
    return subtotal >= 200 ? 15 : 10;
  }, [orderType, subtotal]);

  const selectedVoucher = useMemo(
    () => vouchers.find((v) => v.id === selectedVoucherId),
    [selectedVoucherId]
  );

  const deliveryFeeAfterVoucher = useMemo(() => {
    if (orderType !== "Delivery") return 0;
    if (
      selectedVoucher?.type === "free_delivery" &&
      subtotal >= selectedVoucher.min
    )
      return 0;
    return rawDeliveryFee;
  }, [orderType, rawDeliveryFee, selectedVoucher, subtotal]);

  const voucherDiscount = useMemo(() => {
    if (!selectedVoucher) return 0;
    if (selectedVoucher.type === "threshold_minus") {
      return subtotal >= selectedVoucher.min ? selectedVoucher.off : 0;
    }
    if (selectedVoucher.type === "new_user_minus") {
      // For demo we always allow it (you can gate by user flag later)
      return selectedVoucher.off;
    }
    return 0;
  }, [selectedVoucher, subtotal]);

  const total = useMemo(
    () => Math.max(0, subtotal + deliveryFeeAfterVoucher - voucherDiscount),
    [subtotal, deliveryFeeAfterVoucher, voucherDiscount]
  );

  // ---- Effects ----
  useEffect(() => {
    // Mock shops (in real app, fetch from API)
    setShops(mockShops);
  }, []);

  // Reset address/pickup when switching types
  useEffect(() => {
    setErrors({});
    if (orderType === "Delivery") {
      setPickupShopId("");
    } else if (orderType === "Pickup") {
      setAddress({
        fullname: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postcode: "",
      });
    } else {
      // Dine-in — clear both
      setPickupShopId("");
      setAddress({
        fullname: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postcode: "",
      });
    }
  }, [orderType]);

  // ---- Handlers ----
  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  const currency = (v: number) =>
    new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(v);

  const validateIfNeeded = async () => {
    // Pickup must select a shop
    if (orderType === "Pickup" && !pickupShopId) {
      setErrors({ pickupShopId: "Please select a pickup location" });
      return false;
    }
    // Delivery must fill address
    if (orderType === "Delivery") {
      try {
        await deliverySchema.validate(address, { abortEarly: false });
      } catch (e: any) {
        const errs: Record<string, string> = {};
        for (const err of e.inner ?? []) errs[err.path] = err.message;
        setErrors(errs);
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const onProceed = async () => {
    const ok = await validateIfNeeded();
    if (!ok) return;
    setPaymentVisible(true);
    // scroll into view optionally
    setTimeout(() => {
      document
        .getElementById("payment-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleOnlineBanking = () => {
    if (bankLinkOpened) return;
    setBankLinkOpened(true);
    const win = window.open(
      "https://sandbox.bank.example/checkout",
      "_blank",
      "noopener,noreferrer"
    );
    // Simulate returning after 3s
    setTimeout(() => {
      try {
        win?.close();
      } catch {}
      setBankLinkOpened(false);
    }, 3000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        {/* Cart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#1A1A1A",
              borderRadius: 2,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Your Cart
            </Typography>

            {cart.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Your cart is empty.
              </Typography>
            )}

            {cart.map((item, idx) => (
              <Box key={item.id}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, py: 1 }}
                >
                  <Avatar
                    variant="rounded"
                    src={item.thumb}
                    sx={{ width: 64, height: 64, borderRadius: 1 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currency(item.price)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => changeQty(item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.qty}</Typography>
                    <IconButton
                      color="primary"
                      onClick={() => changeQty(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
                {idx < cart.length - 1 && (
                  <Divider sx={{ borderColor: "#2E2E2E" }} />
                )}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#1A1A1A",
              borderRadius: 2,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Order Summary
            </Typography>

            {/* Services (Order Type) */}
            <Typography variant="body2" sx={{ mb: 1 }}>
              Service Type
            </Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={orderType}
              onChange={(_, v) => v && setOrderType(v)}
              sx={{ mb: 2, width: "100%" }}
            >
              <ToggleButton value="Pickup" sx={{ flex: 1 }}>
                Self Pickup
              </ToggleButton>
              <ToggleButton value="Delivery" sx={{ flex: 1 }}>
                Delivery
              </ToggleButton>
              <ToggleButton value="Dine-in" sx={{ flex: 1 }}>
                Dine-in
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Pickup: choose shop */}
            <Collapse in={orderType === "Pickup"} unmountOnExit>
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Pickup Location"
                  value={pickupShopId}
                  onChange={(e) => setPickupShopId(e.target.value)}
                  error={Boolean(errors.pickupShopId)}
                  helperText={errors.pickupShopId}
                >
                  {shops.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: s.isOpen ? "success.main" : "error.main",
                          }}
                        />
                        <span>{s.name}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
                <FormHelperText sx={{ mt: 1 }}>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "error.main",
                      display: "inline-block",
                      mr: 1,
                    }}
                  />
                  Red dot means the shop is closed (unavailable for pickup).
                </FormHelperText>
              </Box>
            </Collapse>

            {/* Delivery: address */}
            <Collapse in={orderType === "Delivery"} unmountOnExit>
              <Box sx={{ display: "grid", gap: 1.25, mb: 2 }}>
                <TextField
                  label="Full Name"
                  value={address.fullname}
                  onChange={(e) =>
                    setAddress({ ...address, fullname: e.target.value })
                  }
                  error={Boolean(errors.fullname)}
                  helperText={errors.fullname}
                />
                <TextField
                  label="Phone (Malaysia)"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
                <TextField
                  label="Address Line 1"
                  value={address.line1}
                  onChange={(e) =>
                    setAddress({ ...address, line1: e.target.value })
                  }
                  error={Boolean(errors.line1)}
                  helperText={errors.line1}
                />
                <TextField
                  label="Address Line 2"
                  value={address.line2}
                  onChange={(e) =>
                    setAddress({ ...address, line2: e.target.value })
                  }
                />
                <TextField
                  label="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />
                <TextField
                  label="State"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  error={Boolean(errors.state)}
                  helperText={errors.state}
                />
                <TextField
                  label="Postcode"
                  value={address.postcode}
                  onChange={(e) =>
                    setAddress({ ...address, postcode: e.target.value })
                  }
                  error={Boolean(errors.postcode)}
                  helperText={errors.postcode}
                />
              </Box>
            </Collapse>

            {/* Voucher section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Voucher
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {selectedVoucher ? (
                  <>
                    <Chip
                      label={selectedVoucher.label}
                      onDelete={() => setSelectedVoucherId("")}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Button size="small" onClick={() => setVoucherOpen(true)}>
                      Change
                    </Button>
                  </>
                ) : (
                  <Button size="small" onClick={() => setVoucherOpen(true)}>
                    Add
                  </Button>
                )}
              </Stack>
              <FormHelperText sx={{ mt: 0.5 }}>
                Only one voucher can be used at a time.
              </FormHelperText>
            </Box>

            {/* Totals */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography>{currency(subtotal)}</Typography>
            </Box>
            {orderType === "Delivery" && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Delivery Fee</Typography>
                <Typography>
                  {selectedVoucher?.type === "free_delivery" &&
                  subtotal >= (selectedVoucher as any).min ? (
                    <Chip size="small" color="success" label="FREE" />
                  ) : (
                    currency(deliveryFeeAfterVoucher)
                  )}
                </Typography>
              </Box>
            )}
            {voucherDiscount > 0 && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Voucher Discount</Typography>
                <Typography color="success.main">
                  − {currency(voucherDiscount)}
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 1, borderColor: "#2E2E2E" }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Total</Typography>
              <Typography fontWeight={700}>{currency(total)}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 50 }}
              onClick={onProceed}
            >
              Proceed to Payment
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Payment section (revealed after proceed) */}
      <Collapse in={paymentVisible} unmountOnExit>
        <Box id="payment-section" sx={{ mt: 2 }}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#1A1A1A",
              borderRadius: 2,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Payment Method
            </Typography>

            <RadioGroup
              value={paymentMethod}
              onChange={(_, v) => setPaymentMethod(v as any)}
              sx={{ gap: 1, mb: 2 }}
            >
              <FormControlLabel
                value="online_banking"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LanguageIcon />
                    <Typography>Online Banking</Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                value="qr"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <QrCode2Icon />
                    <Typography>QR Pay</Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CreditCardIcon />
                    <Typography>Bank Card</Typography>
                  </Stack>
                }
              />
            </RadioGroup>

            {/* Method details */}
            <Collapse in={paymentMethod === "online_banking"} unmountOnExit>
              <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  You’ll be redirected to bank’s secure page. This page will
                  stay and return after 3 seconds.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleOnlineBanking}
                  disabled={bankLinkOpened}
                >
                  {bankLinkOpened ? "Opening Bank…" : "Pay via Online Banking"}
                </Button>
              </Card>
            </Collapse>

            <Collapse in={paymentMethod === "qr"} unmountOnExit>
              <Card
                variant="outlined"
                sx={{ p: 2, mb: 2, textAlign: "center" }}
              >
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Scan to pay
                </Typography>
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    mx: "auto",
                    bgcolor: "#fff",
                    borderRadius: 1,
                    backgroundImage:
                      "radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                    backgroundPosition: "0 0, 6px 6px",
                  }}
                />
              </Card>
            </Collapse>

            <Collapse in={paymentMethod === "card"} unmountOnExit>
              <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Stack spacing={1.25}>
                  <TextField label="Cardholder Name" placeholder="As on card" />
                  <TextField
                    label="Card Number"
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  <Stack direction="row" spacing={1}>
                    <TextField
                      label="Expiry (MM/YY)"
                      sx={{ flex: 1 }}
                      placeholder="MM/YY"
                    />
                    <TextField label="CVV" sx={{ flex: 1 }} placeholder="***" />
                  </Stack>
                  <TextField
                    select
                    label="Saved Cards"
                    helperText="No saved cards yet"
                  >
                    <MenuItem value="" disabled>
                      — Empty —
                    </MenuItem>
                  </TextField>
                </Stack>
              </Card>
            </Collapse>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1, mb: 2 }}
            >
              <Typography>Total</Typography>
              <Typography fontWeight={800}>{currency(total)}</Typography>
            </Stack>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 50 }}
            >
              Confirm & Pay
            </Button>

            <FormHelperText sx={{ mt: 1 }}>
              Problems paying? Try another method or contact support:{" "}
              <MuiLink href="mailto:support@sansan-bbq.com" underline="hover">
                support@sansan-bbq.com
              </MuiLink>
            </FormHelperText>
          </Paper>
        </Box>
      </Collapse>

      {/* Voucher dialog */}
      <Dialog
        open={voucherOpen}
        onClose={() => setVoucherOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Select a voucher</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1}>
            {vouchers.map((v) => {
              const eligible =
                (v.type === "threshold_minus" && subtotal >= v.min) ||
                (v.type === "free_delivery" && subtotal >= v.min) ||
                v.type === "new_user_minus"; // demo: always true
              return (
                <Paper
                  key={v.id}
                  variant="outlined"
                  sx={{
                    p: 1.25,
                    borderColor:
                      selectedVoucherId === v.id ? "primary.main" : "divider",
                    opacity: eligible ? 1 : 0.5,
                    cursor: eligible ? "pointer" : "not-allowed",
                  }}
                  onClick={() => eligible && setSelectedVoucherId(v.id)}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>{v.label}</Typography>
                    {selectedVoucherId === v.id && (
                      <Chip size="small" color="primary" label="Selected" />
                    )}
                  </Stack>
                  {v.type !== "new_user_minus" && (
                    <FormHelperText>
                      Condition: Subtotal ≥ {currency((v as any).min)}
                    </FormHelperText>
                  )}
                </Paper>
              );
            })}
          </Stack>
          <FormHelperText sx={{ mt: 1 }}>
            Only one voucher can be used per order.
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVoucherOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => setVoucherOpen(false)}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
