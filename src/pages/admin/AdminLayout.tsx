import { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

type AdminLayoutProps = {
  title?: string;
  onNav?: (path: string) => void;
  active?: string;
  children: ReactNode;
};

export default function AdminLayout({
  title = "Admin",
  onNav,
  active,
  children,
}: AdminLayoutProps) {
  const links = [
    { key: "dashboard", label: "Dashboard", path: "/pages/admin" },
    { key: "menu", label: "Menu", path: "/pages/admin/menu" },
    { key: "orders", label: "Orders", path: "/pages/admin/orders" },
    { key: "users", label: "Users", path: "/pages/admin/users" },
    { key: "shops", label: "Shops", path: "/pages/admin/shops" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: (t) => t.palette.background.default,
      }}
    >
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          background: "rgba(14,14,14,0.8)",
          backdropFilter: "blur(6px)",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <MenuIcon />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton color="secondary">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            width: 220,
            backgroundColor: (t) => t.palette.background.default,
            borderRight: (t) => `1px solid ${t.palette.divider}`,
          },
        }}
      >
        <Toolbar />
        <List>
          {links.map((l) => (
            <ListItemButton
              key={l.key}
              selected={active === l.key}
              onClick={() => onNav && onNav(l.path)}
              sx={{ borderRadius: 1, mx: 1 }}
            >
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: (t) => t.palette.text.primary },
                }}
                primary={l.label}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { xs: 0, md: 28 } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
