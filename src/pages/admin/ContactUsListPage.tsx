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
  Button,
  IconButton,
} from "@mui/material";
import Layout from "../../Layout";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import { useQuery } from "@tanstack/react-query";
import { getContactUs } from "../../api/admin";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import { useNavigate } from "react-router-dom";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
const ContactUsListPage = () => {
  const { data: subscribleList } = useQuery({
    queryKey: ["getContactUs", 50, 0],
    queryFn: () => getContactUs(50, 0),
  });
  const navigate = useNavigate();

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
            Contact Us List
          </Typography>
          <Box gap={2}>
            <IconButton onClick={() => navigate(`/admin/product-list`)}>
              <InventoryRoundedIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/admin/subscrible-list`)}>
              <MarkEmailReadRoundedIcon />
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
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscribleList?.data?.map((product: any, index: number) => (
                    <TableRow key={product.code} sx={{ verticalAlign: "top" }}>
                      <TableCell>
                        {index + 1}. {product.email}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.phone}</TableCell>
                      <TableCell>{product.message}</TableCell>
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

export default ContactUsListPage;
