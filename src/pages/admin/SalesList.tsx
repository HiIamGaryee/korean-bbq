import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Grid,
  IconButton,
} from "@mui/material";
import Layout from "../../Layout";

import { useQuery } from "@tanstack/react-query";
import { getEmailSubscribe } from "../../api";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import { useNavigate } from "react-router-dom";
import { getCheckoutList } from "../../api/admin/getCheckoutList";

const SalesList = () => {
  const navigate = useNavigate();

  const { data: subscribleList } = useQuery({
    queryKey: ["getCheckoutList", 50, 0],
    queryFn: () => getCheckoutList(50, 0),
  });

  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sales List
          </Typography>
          <Box gap={2}>
            <IconButton onClick={() => navigate(`/admin/product-list`)}>
              <InventoryRoundedIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/admin/subscrible-list`)}>
              <MarkEmailReadRoundedIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/admin/contact-us-list`)}>
              <AddIcCallRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Shipping</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Product Code</TableCell>
                    <TableCell>Product Price</TableCell>
                    <TableCell>Product Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscribleList?.data?.flatMap((order: any, index: number) =>
                    order.products.map((product: any, productIndex: number) => (
                      <TableRow
                        key={`${order._id}-${productIndex}`}
                        sx={{ verticalAlign: "top" }}
                      >
                        {/* Display order details only on the first product row */}
                        {productIndex === 0 && (
                          <>
                            <TableCell rowSpan={order.products.length}>
                              {index + 1}
                            </TableCell>
                            <TableCell rowSpan={order.products.length}>
                              {order.email}
                            </TableCell>
                            <TableCell rowSpan={order.products.length}>
                              {order.shipping}
                            </TableCell>
                            <TableCell rowSpan={order.products.length}>
                              {order.total}
                            </TableCell>
                            <TableCell rowSpan={order.products.length}>
                              {order.address}
                            </TableCell>
                            <TableCell rowSpan={order.products.length}>
                              {order.mobile}
                            </TableCell>
                            <TableCell rowSpan={order.products.length}>
                              {order.status}
                            </TableCell>
                          </>
                        )}
                        {/* Product details for each row */}
                        <TableCell>{product.code}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SalesList;
