import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import { getAdmin } from "../../api/admin";

function useMouseStalker() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return pos;
}

export default function DashboardPage() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [orders, setOrders] = useState<any[]>([]);
  const pos = useMouseStalker();

  useEffect(() => {
    (async () => {
      try {
        const s = await getAdmin("/stats");
        setStats([
          { label: "Total Orders", value: s.totalSales ?? 0 },
          { label: "Revenue", value: s.revenue ?? "$0" },
          { label: "Top Dishes", value: s.topDishes?.[0]?.name ?? "-" },
        ]);
      } catch {}
      try {
        const o = await getAdmin("/orders");
        setOrders(o.orders ?? []);
      } catch {}
    })();
  }, []);

  return (
    <AdminLayout
      title="Admin Dashboard"
      onNav={(p) => navigate(p)}
      active="dashboard"
    >
      {/* Food Carousel */}
      <Box sx={{ mb: 3 }}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            600: { slidesPerView: 2 },
            1200: { slidesPerView: 4 },
          }}
        >
          {[
            {
              id: 1,
              name: "Jeera Chawal",
              price: 180,
              old: 200,
              img: "https://images.unsplash.com/photo-1542442828-287211e2cd50?w=800&auto=format&fit=crop",
            },
            {
              id: 2,
              name: "Kadai Chicken",
              price: 220,
              old: 260,
              img: "https://images.unsplash.com/photo-1604908176997-9313b2b76c7e?w=800&auto=format&fit=crop",
            },
            {
              id: 3,
              name: "Palak Paneer",
              price: 200,
              old: 220,
              img: "https://images.unsplash.com/photo-1631459375138-3e9d9e0d05f6?w=800&auto=format&fit=crop",
            },
            {
              id: 4,
              name: "Mutton Curry",
              price: 260,
              old: 300,
              img: "https://images.unsplash.com/photo-1604908554015-7dd09f0ae7d2?w=800&auto=format&fit=crop",
            },
            {
              id: 5,
              name: "Veg Biryani",
              price: 190,
              old: 210,
              img: "https://images.unsplash.com/photo-1625944529448-56a67a9d88d2?w=800&auto=format&fit=crop",
            },
            {
              id: 6,
              name: "Butter Naan",
              price: 70,
              old: 80,
              img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop",
            },
          ].map((f) => (
            <SwiperSlide key={f.id}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  p: 2,
                  bgcolor: (t) => t.palette.background.paper,
                  boxShadow: 2,
                  overflow: "visible",
                  height: 300,
                }}
              >
                {/* Protruding image */}
                <Box
                  component="img"
                  src={f.img}
                  alt={f.name}
                  sx={{
                    position: "absolute",
                    top: -40,
                    left: 24,
                    width: 140,
                    height: 110,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 3,
                    transform: "rotate(-8deg)",
                  }}
                />
                {/* Price badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 16,
                    width: 74,
                    height: 74,
                    borderRadius: "50%",
                    bgcolor: "#ffffff",
                    boxShadow: 3,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      PRICE
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      ₹{f.price}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.disabled",
                      }}
                    >
                      ₹{f.old}
                    </Typography>
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ mt: 8 }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Chef
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>
                    {f.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Aromatic, soft, and tender chunks of lamb layered with rice
                    infused with the flavors of spices…
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label="ORDER NOW" color="secondary" clickable />
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Grid container spacing={2}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s.label}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: (t) => t.palette.background.paper,
                borderRadius: 2,
                borderLeft: (t) => `4px solid ${t.palette.secondary.main}`,
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {s.label}
              </Typography>
              <Typography variant="h5">{s.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
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
                  Order ID
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
              {orders.map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>{o.orderId ?? o.id}</TableCell>
                  <TableCell>{o.customer ?? o.customerName}</TableCell>
                  <TableCell>
                    <Chip
                      label={o.status}
                      color={o.status === "Confirmed" ? "secondary" : "primary"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {typeof o.amount === "number"
                      ? `$${o.amount.toFixed(2)}`
                      : o.total ?? "-"}
                  </TableCell>
                  <TableCell>{o.time ?? o.orderTimestamp ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Box
        sx={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          width: 10,
          height: 10,
          borderRadius: 5,
          bgcolor: (t) => t.palette.secondary.main,
          boxShadow: 3,
          pointerEvents: "none",
          zIndex: 1300,
        }}
      />
    </AdminLayout>
  );
}
