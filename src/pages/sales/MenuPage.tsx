import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  InputBase,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getMenu, type MenuItem } from "../../api/getMenu";
import { getCategories } from "../../api/categories";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const DEFAULT_TABS = ["All"] as const;

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tabs, setTabs] = useState<string[]>([...DEFAULT_TABS]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    async function loadMenu() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMenu();
        if (isMounted) setMenu(data.menu ?? []);
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    async function loadCategories() {
      try {
        const data = await getCategories();
        const cats = Array.isArray(data.categories) ? data.categories : [];
        if (isMounted) setTabs(["All", ...cats]);
      } catch {}
    }
    loadMenu();
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => tabs.filter((t) => t !== "All"), [tabs]);

  const filteredMenu = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((m) => {
      const okTab = activeTab === "All" ? true : m.category === activeTab;
      const okQuery = q
        ? m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
        : true;
      return okTab && okQuery;
    });
  }, [menu, activeTab, query]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Menu
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Tabs
            value={tabs.indexOf(activeTab)}
            onChange={(_, idx) => setActiveTab(tabs[idx])}
            sx={{
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderRadius: 1,
              minHeight: 44,
              "& .MuiTab-root": { minHeight: 44 },
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            {tabs.map((c) => (
              <Tab
                key={c}
                label={c}
                sx={{
                  textTransform: "none",
                  color: (theme) => theme.palette.text.secondary,
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "#FFFFFF",
                  },
                }}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#1A1A1A",
              borderRadius: 2,
              px: 1,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <SearchIcon sx={{ color: "text.secondary" }} />
            <InputBase
              placeholder="Search dishes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                ml: 1,
                color: "text.primary",
                minWidth: { xs: 160, md: 260 },
              }}
            />
          </Box>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid container spacing={2}>
          {filteredMenu.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform .2s ease, box-shadow .2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 20px rgba(107,60,246,0.3)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                      {item.name}
                    </Typography>
                    {!!(item as any).kcal && (
                      <Chip
                        label={`${(item as any).kcal} kcal`}
                        size="small"
                        sx={{
                          bgcolor: (t) => t.palette.divider,
                          color: "text.secondary",
                        }}
                      />
                    )}
                    {!!(item as any).spicy_level &&
                      (item as any).spicy_level > 1 && (
                        <Chip label="Spicy" color="secondary" size="small" />
                      )}
                  </Box>
                  {(item as any).image && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={(item as any).image}
                      alt={item.name}
                      sx={{ borderRadius: 1, objectFit: "cover", mb: 1 }}
                    />
                  )}
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="h6">
                    {formatCurrency(item.price)}{" "}
                    <Typography component="span" variant="body2">
                      / {item.unit}
                    </Typography>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    p: 2,
                    pt: 0,
                    gap: 1,
                    flexWrap: { xs: "wrap", md: "nowrap" },
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: 50 }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ borderRadius: 50 }}
                    disabled={!item.isAvailable}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
