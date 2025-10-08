import React from "react";
import Layout from "../Layout";
import { Box, Paper, Typography, Stack, Chip, Divider } from "@mui/material";

const mockToday = [
  { title: "Order Shipped", time: "1h", unread: true },
  { title: "Flash Sale Alert", time: "1h", unread: true },
  { title: "Product Review Request", time: "1h", unread: false },
];
const mockYesterday = [
  { title: "Order Shipped", time: "1d", unread: false },
  { title: "New Paypal Added", time: "1d", unread: false },
  { title: "Flash Sale Alert", time: "1d", unread: false },
];

const Section = ({ label, items }: { label: string; items: any[] }) => (
  <Paper sx={{ p: 2, borderRadius: 3 }}>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Typography variant="subtitle1" fontWeight={800}>
        {label}
      </Typography>
      <Typography variant="caption" color="primary.main">
        Mark all as read
      </Typography>
    </Stack>
    <Stack divider={<Divider />}>
      {items.map((n, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ py: 1 }}
        >
          <Chip
            size="small"
            label={n.unread ? "NEW" : ""}
            color={n.unread ? "secondary" : undefined}
            variant={n.unread ? "filled" : "outlined"}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight={700}>{n.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur.
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {n.time}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Paper>
);

const NotificationsPage: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 3, display: "grid", gap: 2 }}>
        <Typography variant="h5">Notifications</Typography>
        <Section label="TODAY" items={mockToday} />
        <Section label="YESTERDAY" items={mockYesterday} />
      </Box>
    </Layout>
  );
};

export default NotificationsPage;
