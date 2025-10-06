import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../../Layout";
import { useNavigate } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../../api/admin";

const ProductPage = () => {
  const navigate = useNavigate();
  const { data: bestSellerList } = useQuery({
    queryKey: ["getProductList", 50, 0],
    queryFn: () => getProductList(50, 0),
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation to product details
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find(
      (item: any) => item.code === product.code
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        name: product.name,
        code: product.code,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "light.main",
          color: "white",
          padding: 4,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: "auto", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Buy Now
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            Buy a new coffee bean and try it Now. No Coffee No Life.
          </Typography>
          <Grid container spacing={4}>
            {bestSellerList?.data?.map((item: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item.code}
                onClick={() =>
                  navigate(`/product/${item.code}`, {
                    state: {
                      product: item,
                    },
                  })
                }
              >
                <Card sx={{ mb: 2, py: 0, px: 2 }}>
                  <CardContent>
                    <Box
                      component="img"
                      src={(() => {
                        try {
                          return require(`../../assets/brewed-in-chaos/package-face/${item.code}.png`);
                        } catch (error) {
                          return require(`../../assets/brewed-in-chaos/package-face/default.png`);
                        }
                      })()}
                      alt="Product Image"
                      sx={{
                        cursor: "pointer",
                        p: 1,
                        width: 1,
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </CardContent>
                  <Typography
                    variant="body1"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="primary.main"
                      fontWeight="bold"
                    >
                      $ {item.price}
                    </Typography>
                    <IconButton
                      onClick={(event) => handleAddToCart(item, event)}
                    >
                      <ShoppingCartRoundedIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {showSuccess && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: 120,
            right: 16,
            padding: 2,
            zIndex: 1100,
            borderRadius: "8px",
          }}
        >
          🚀 Successfully submitted!
        </Paper>
      )}
    </Layout>
  );
};

export default ProductPage;
