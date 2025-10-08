import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableHead,
  TableRow,
  Stack,
  Grid,
  TextField,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../../Layout";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useAppMutation } from "../../hooks/useAppMutation";
import { CheckoutParams, postCheckout } from "../../api/admin";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
type CartProduct = {
  name: string;
  code: string;
  price: number;
  quantity: number;
};

const CartPage = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [mobile, setMobile] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [promo, setPromo] = useState<string>("");
  const [serviceType, setServiceType] = useState<"delivery" | "dinein">(
    "delivery"
  );
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "qr" | "card">(
    "online"
  );

  const { mutate, reset } = useAppMutation(postCheckout, {
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setProducts([]); // Clear cart after successful checkout
      localStorage.removeItem("cart"); // Clear localStorage cart
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setProducts(cart);
  }, []);

  const handleQuantityChange = (code: string, newQuantity: number) => {
    const updatedProducts = products.map((product: CartProduct) => {
      if (product.code === code) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  // Function to remove item from cart
  const handleRemoveItem = (code: string) => {
    const updatedProducts = products.filter(
      (product: CartProduct) => product.code !== code
    );
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  // Calculate the subtotal
  const subtotal = products.reduce((sum: number, item: CartProduct) => {
    return sum + item.price * item.quantity;
  }, 0);
  const serviceTax = +(subtotal * 0.06).toFixed(2);
  const totalWithTax = +(subtotal + serviceTax).toFixed(2);

  const requiredOk = () => {
    const hasProducts = products.length > 0;
    const deliveryOk =
      serviceType === "dinein" || (address && deliveryDate && deliveryTime);
    return hasProducts && deliveryOk;
  };

  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    setOpen(true); // Open the dialog instead of calling mutate directly
  };

  const handleConfirmCheckout = () => {
    const checkoutData: CheckoutParams = {
      customer: {
        name: "Customer", // You might want to get this from user context
        phone: mobile,
        email: email,
      },
      items: products.map(({ code, price, quantity }) => ({
        id: code,
        quantity,
        priceAtOrderTime: typeof price === "string" ? parseFloat(price) : price,
      })),
      orderType: "delivery", // or "pickup"
      specialInstructions: null,
      paymentMethod: "cash", // or other payment method
      estimatedTotal: subtotal,
    };
    mutate(checkoutData);
    setOpen(false); // Close the dialog after confirming
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog without proceeding
  };

  return (
    <Layout>
      <Typography variant="h5" sx={{ px: 2, pt: 2, pb: 1 }}>
        Shopping Cart
      </Typography>
      {/* Always-visible Service Type & Date/Time (sticky style) */}
      <Paper
        sx={{
          mx: { xs: 2, md: 4 },
          mb: 2,
          p: 2,
          borderRadius: 3,
          position: "relative",
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Service Type
        </Typography>
        <ToggleButtonGroup
          value={serviceType}
          exclusive
          onChange={(_, v) => v && setServiceType(v)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="delivery">Pick-Up</ToggleButton>
          <ToggleButton value="dinein">Self Service</ToggleButton>
        </ToggleButtonGroup>
        {serviceType === "delivery" && (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              label="Date"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Time"
              type="time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        )}
      </Paper>

      <Grid container spacing={3} sx={{ p: { xs: 2, md: 4 }, pt: 0 }}>
        {/* Left: Items (mobile renders cards; desktop renders table) */}
        <Grid item xs={12} md={8}>
          {!isMdUp ? (
            <Stack spacing={2}>
              {/* (Service Type moved to sticky block above) */}
              {products.length === 0 && (
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <Typography color="text.secondary">
                    Your cart is empty.
                  </Typography>
                </Paper>
              )}
              {products.map((product) => (
                <Paper key={product.code} sx={{ p: 2, borderRadius: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component="img"
                      src={`https://picsum.photos/seed/${product.code}/96/96`}
                      alt={product.name}
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={700}>{product.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ${product.price}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleRemoveItem(product.code)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <Button variant="text" size="small">
                      Edit
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        border: (t) => `1px solid ${t.palette.divider}`,
                        borderRadius: 999,
                        px: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            product.code,
                            Math.max(1, product.quantity - 1)
                          )
                        }
                        disabled={product.quantity <= 1}
                      >
                        <RemoveRoundedIcon />
                      </IconButton>
                      <Typography sx={{ width: 24, textAlign: "center" }}>
                        {product.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            product.code,
                            product.quantity + 1
                          )
                        }
                      >
                        <AddRoundedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                Add More Items
              </Button>
              {/* Promo code */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Promo Code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                />
                <Button variant="contained">Apply</Button>
              </Box>
              <Button
                size="small"
                variant="text"
                onClick={() => setCouponOpen(true)}
                sx={{ alignSelf: "flex-end" }}
              >
                View available coupons
              </Button>
            </Stack>
          ) : (
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Your cart is empty.
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product: any) => (
                      <TableRow key={product.code}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <Box
                            component="img"
                            src={`https://picsum.photos/seed/${product.code}/80/80`}
                            alt={product.name}
                            sx={{
                              width: 64,
                              height: 64,
                              objectFit: "cover",
                              borderRadius: 1,
                            }}
                          />
                          {product.name}
                        </TableCell>
                        <TableCell align="right">${product.price}</TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            <IconButton
                              onClick={() =>
                                handleQuantityChange(
                                  product.code,
                                  Math.max(1, product.quantity - 1)
                                )
                              }
                              disabled={product.quantity <= 1}
                            >
                              <RemoveRoundedIcon />
                            </IconButton>
                            <Typography sx={{ mx: 2 }}>
                              {product.quantity}
                            </Typography>
                            <IconButton
                              onClick={() =>
                                handleQuantityChange(
                                  product.code,
                                  product.quantity + 1
                                )
                              }
                            >
                              <AddRoundedIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          ${product.price * product.quantity}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleRemoveItem(product.code)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        {/* Right: Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Discount Coupon
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Promo Code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                />
                <Button variant="contained">Apply</Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Order Summary
              </Typography>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Sub total</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">
                    Service tax (6%)
                  </Typography>
                  <Typography>${serviceTax.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 700,
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography fontWeight={800}>
                    ${totalWithTax.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
              {/* Personal Details (web) */}
              {isMdUp && (
                <Stack spacing={2} sx={{ mb: 2 }}>
                  {serviceType === "delivery" && (
                    <TextField
                      label="Delivery Address"
                      fullWidth
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  )}
                  <TextField
                    label="Mobile No"
                    fullWidth
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Stack>
              )}
              {!showPayment ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!requiredOk()}
                  onClick={() => setShowPayment(true)}
                  sx={{ py: 1.25, borderRadius: 2 }}
                >
                  Continue
                </Button>
              ) : (
                <Stack spacing={2}>
                  <Typography variant="h6">Choose Payment</Typography>
                  <ToggleButtonGroup
                    value={paymentMethod}
                    exclusive
                    onChange={(_, v) => v && setPaymentMethod(v)}
                  >
                    <ToggleButton value="online">Online Banking</ToggleButton>
                    <ToggleButton value="qr">QR</ToggleButton>
                    <ToggleButton value="card">Bank Card</ToggleButton>
                  </ToggleButtonGroup>
                  {paymentMethod === "online" && (
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        You will be redirected to your bank's secure page.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          const w = window.open(
                            "https://example.com/bank",
                            "_blank"
                          );
                          setTimeout(() => {
                            try {
                              w?.close();
                            } catch {}
                            handleCheckout();
                          }, 3000);
                        }}
                      >
                        Pay via Bank
                      </Button>
                    </Box>
                  )}
                  {paymentMethod === "qr" && (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Scan QR to Pay
                      </Typography>
                      <Box
                        sx={{
                          width: 180,
                          height: 180,
                          mx: "auto",
                          bgcolor: theme.palette.action.hover,
                          borderRadius: 2,
                        }}
                      />
                      <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleCheckout}
                      >
                        I have paid
                      </Button>
                    </Box>
                  )}
                  {paymentMethod === "card" && (
                    <Stack spacing={1}>
                      <TextField
                        label="Card Number"
                        placeholder="4111 1111 1111 1111"
                      />
                      <Stack direction="row" spacing={1}>
                        <TextField
                          label="Expiry"
                          placeholder="MM/YY"
                          fullWidth
                        />
                        <TextField label="CVV" placeholder="123" fullWidth />
                      </Stack>
                      <Button variant="contained" onClick={handleCheckout}>
                        Pay ${totalWithTax.toFixed(2)}
                      </Button>
                    </Stack>
                  )}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {showSuccess && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: 120,
            right: 16,
            padding: 2,
            borderRadius: "8px",
          }}
        >
          🛍️ Successfully add to Cart!
        </Paper>
      )}
      {/* Coupons dialog */}
      <Dialog
        open={couponOpen}
        onClose={() => setCouponOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Coupons</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Enter Coupon Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <Button variant="contained" onClick={() => setCouponOpen(false)}>
              Apply
            </Button>
          </Box>
          <Stack spacing={2}>
            {[
              {
                code: "DIGISMART",
                title:
                  "Flat 10% OFF on Standard Chartered Digismart Credit Cards",
                note: "No Minimum Order Value",
              },
              {
                code: "HSBC10",
                title: "Flat 10% OFF upto $10 on HSBC Cashback Credit Card",
                note: "Total Value of items Must be $3 or More",
              },
              {
                code: "PAYMENT50",
                title: "Get Upto 50 OFF on Your First Payment",
                note: "Total Value of items Must be $10 or More",
              },
            ].map((c) => (
              <Paper key={c.code} sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                  {c.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {c.note}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Button size="small" variant="outlined">
                    {c.code}
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setPromo(c.code);
                      setCouponOpen(false);
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Payment Method</DialogTitle>

        <DialogActions sx={{ display: "flex", gap: 2, p: 2 }}>
          <Button
            onClick={handleConfirmCheckout}
            color="primary"
            startIcon={<CurrencyBitcoinRoundedIcon />}
          >
            Cryptocurrency
          </Button>
          <Button
            onClick={handleConfirmCheckout}
            color="primary"
            startIcon={<AccountBalanceRoundedIcon />}
          >
            Bank Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default CartPage;
