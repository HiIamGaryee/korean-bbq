import React from "react";
import Layout from "../Layout";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  LinearProgress,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RedeemIcon from "@mui/icons-material/Redeem";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { motion } from "framer-motion";

const PRIMARY_FALLBACK = "#1e3f7e"; // deep blue
const ACCENT_FALLBACK = "#29b6f6"; // light blue

function a11yProps(index: number) {
  return {
    id: `reward-tab-${index}`,
    "aria-controls": `reward-tabpanel-${index}`,
  } as const;
}

const RewardPage: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (_: React.SyntheticEvent, value: number) =>
    setTab(value);

  // In a real app this would come from API/user profile
  const collected = 0; // number of stamps collected
  const targetMobile = 5; // mobile target for display text
  const stampsOnWeb = 8; // visual weight on web per spec
  const stampsToShow = isMdUp ? stampsOnWeb : targetMobile;

  const progress = Math.min((collected / targetMobile) * 100, 100);

  // Theme-driven colors (fall back to provided constants)
  const PRIMARY = theme.palette?.primary?.main || PRIMARY_FALLBACK;
  const ACCENT =
    theme.palette?.info?.main ||
    theme.palette?.primary?.light ||
    ACCENT_FALLBACK;
  const BG_DEFAULT = theme.palette?.background?.default || "#f7f8fa";
  const PAPER_BG = theme.palette?.background?.paper || "#ffffff";

  const rules = [
    "Each qualifying drink purchase earns one stamp. Collect 5 to redeem.",
    "Valid for designated series: hand-brewed/hot/iced/specialty only.",
    "Member discounts and other promos cannot be combined.",
    "Valid at participating stores only.",
    "Expires on 2038-01-19 11:14:07.",
    "Complete the cycle to receive aRM20 voucher for selected items.",
  ];

  return (
    <Layout>
      <Box
        sx={{ bgcolor: BG_DEFAULT, minHeight: "100vh", py: { xs: 3, md: 6 } }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          {/* Hero Header */}
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
          >
            {/* Left: Stamp tracker + actions */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: PAPER_BG,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 6, -6, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Box
                          sx={{
                            width: isSmDown ? 44 : 56,
                            height: isSmDown ? 44 : 56,
                            borderRadius: "50%",
                            background: `radial-gradient(ellipse at 40% 40%, ${ACCENT}, ${PRIMARY})`,
                            display: "grid",
                            placeItems: "center",
                            boxShadow: `0 0 20px ${ACCENT}66`,
                          }}
                        >
                          <LocalCafeIcon htmlColor="#fff" />
                        </Box>
                      </motion.div>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 800, color: PRIMARY }}
                        >
                          Collect & Redeem
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          You have collected {collected} stamps
                        </Typography>
                      </Box>
                    </Box>

                    {/* Stamp Tracker Row */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isSmDown
                          ? "flex-start"
                          : "space-between",
                        gap: isSmDown ? 1.5 : 2,
                        flexWrap: "wrap",
                        my: isSmDown ? 2 : 3,
                      }}
                    >
                      {Array.from({ length: stampsToShow }).map((_, i) => {
                        const filled = i < collected;
                        return (
                          <motion.div key={i} whileHover={{ scale: 1.06 }}>
                            <Box
                              sx={{
                                width: isSmDown ? 44 : 52,
                                height: isSmDown ? 44 : 52,
                                borderRadius: 2,
                                display: "grid",
                                placeItems: "center",
                                border: "2px solid",
                                borderColor: filled ? PRIMARY : "#cfd8dc",
                                background: filled
                                  ? `linear-gradient(180deg, ${ACCENT} 0%, ${PRIMARY} 100%)`
                                  : "transparent",
                                color: filled ? "#fff" : "#90a4ae",
                              }}
                            >
                              <LocalCafeIcon fontSize="small" />
                            </Box>
                          </motion.div>
                        );
                      })}
                    </Box>

                    {/* Progress Indicator */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {collected}/{targetMobile} collected
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Collect {Math.max(targetMobile - collected, 0)} more to
                        redeem
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        ["& .MuiLinearProgress-bar"]: {
                          background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})`,
                        },
                      }}
                    />

                    {/* CTA Buttons */}
                    <Box
                      sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<ReceiptLongIcon />}
                        sx={{
                          bgcolor: PRIMARY,
                          "&:hover": { bgcolor: "#162f60" },
                        }}
                      >
                        View My Rewards
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<RedeemIcon />}
                        sx={{
                          borderColor: PRIMARY,
                          color: PRIMARY,
                          "&:hover": {
                            borderColor: PRIMARY,
                            bgcolor: `${PRIMARY}10`,
                          },
                        }}
                      >
                        Redeem Now
                      </Button>
                    </Box>

                    {/* Tabs */}
                    <Box sx={{ mt: 4 }}>
                      <Tabs
                        value={tab}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        variant={isSmDown ? "fullWidth" : "standard"}
                      >
                        <Tab
                          icon={<ReceiptLongIcon fontSize="small" />}
                          iconPosition="start"
                          label="Stamp Records"
                          {...a11yProps(0)}
                        />
                        <Tab
                          icon={<RedeemIcon fontSize="small" />}
                          iconPosition="start"
                          label="Redeem Records"
                          {...a11yProps(1)}
                        />
                      </Tabs>

                      <Box
                        role="tabpanel"
                        hidden={tab !== 0}
                        id="reward-tabpanel-0"
                        aria-labelledby="reward-tab-0"
                        sx={{ py: 2 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          No stamp records yet. Start collecting with your next
                          purchase!
                        </Typography>
                      </Box>
                      <Box
                        role="tabpanel"
                        hidden={tab !== 1}
                        id="reward-tabpanel-1"
                        aria-labelledby="reward-tab-1"
                        sx={{ py: 2 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          No redemption records yet.
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Right: Rules Card */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: PAPER_BG,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    maxHeight: { xs: 400, md: 520 },
                    overflow: "auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, mb: 2, color: PRIMARY }}
                  >
                    Rules & Terms
                  </Typography>
                  <Box
                    component="ol"
                    sx={{ m: 0, pl: 3, color: "text.secondary" }}
                  >
                    {rules.map((rule, idx) => (
                      <Typography
                        component="li"
                        variant="body2"
                        key={idx}
                        sx={{ mb: 1.25, lineHeight: 1.7 }}
                      >
                        {rule}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default RewardPage;
