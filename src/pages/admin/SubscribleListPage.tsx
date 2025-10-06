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
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import { useNavigate } from "react-router-dom";

const SubscribleListPage = () => {
  const navigate = useNavigate();

  const { data: subscribleList } = useQuery({
    queryKey: ["getEmailSubscribe", 50, 0],
    queryFn: () => getEmailSubscribe(50, 0),
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
            Subscrible List
          </Typography>
          <Box gap={2}>
            <IconButton onClick={() => navigate(`/admin/product-list`)}>
              <InventoryRoundedIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/admin/contact-us-list`)}>
              <AddIcCallRoundedIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/admin/sales-list`)}>
              <MonetizationOnRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscribleList?.data?.map((product: any, index: number) => (
                    <TableRow key={product.code} sx={{ verticalAlign: "top" }}>
                      <TableCell>
                        {index + 1}. {product.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SubscribleListPage;
