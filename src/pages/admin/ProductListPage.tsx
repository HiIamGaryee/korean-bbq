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
  TextField,
  Button,
  Grid,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import Layout from "../../Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  getProductList,
  postDeleteProductList,
  postProductList,
  ProductListParams,
} from "../../api/admin";
import { useAppMutation } from "../../hooks/useAppMutation";
import { useQuery } from "@tanstack/react-query";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import { useNavigate } from "react-router-dom";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
const ProductListPage = () => {
  const validationSchema = Yup.object({
    code: Yup.string().required("Email is required"),
    name: Yup.string().required("name is required"),
    image: Yup.string(),
    price: Yup.string().required("price is required"),
    acidity: Yup.string(),
    roast: Yup.string(),
    processing: Yup.string(),
    description: Yup.string().required("description is required"),
    category: Yup.string().required("category is required"),
    promo: Yup.string(),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductListParams>({
    resolver: yupResolver(validationSchema),
  });

  const { data: bestSellerList, refetch } = useQuery({
    queryKey: ["getProductList", 50, 0],
    queryFn: () => getProductList(50, 0),
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, reset } = useAppMutation(postProductList, {
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      refetch();
    },
  });

  const onSubmit = (data: ProductListParams) => {
    mutate(data);
  };

  const navigate = useNavigate();
  // const handleDelete = (id: string) => {
  //   postDeleteProductList(id)
  //     .then(() => {
  //       refetch();
  //     })
  //     .catch(() => {});
  // };
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
            Admin Product List
          </Typography>
          <Box gap={2}>
            <IconButton onClick={() => navigate(`/admin/subscrible-list`)}>
              <MarkEmailReadRoundedIcon />
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
          <Grid item xs={12} md={8}>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: "200px" }}>Name</TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>Code</TableCell>

                    <TableCell sx={{ minWidth: "150px" }}>Category</TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>Price</TableCell>
                    <TableCell sx={{ minWidth: "200px" }}>Type</TableCell>
                    <TableCell sx={{ minWidth: "250px" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Img</TableCell>
                    {/* <TableCell sx={{ textAlign: "center" }}>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bestSellerList?.data?.map((product: any, index: number) => (
                    <TableRow key={product.code} sx={{ verticalAlign: "top" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ minWidth: "200px" }}
                      >
                        {index + 1}. {product.name}
                      </TableCell>
                      <TableCell sx={{ minWidth: "150px" }}>
                        {product.code}
                      </TableCell>

                      <TableCell sx={{ minWidth: "150px" }}>
                        {product.category}
                      </TableCell>

                      <TableCell sx={{ minWidth: "150px" }}>
                        <Box>$ {product.price} </Box>
                        <Box>
                          Promo: {product.promo ? `$${product.promo}` : "-"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ minWidth: "200px" }}>
                        <Box>
                          Acidity:{" "}
                          {product.acidity ? `${product.acidity}` : "-"}
                        </Box>
                        <Box>
                          Roast: {product.roast ? `${product.roast}` : "-"}
                        </Box>
                        <Box>
                          Processing:{" "}
                          {product.processing ? `${product.processing}` : "-"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ minWidth: "250px" }}>
                        {product.description}
                      </TableCell>
                      <TableCell>
                        <Box
                          component="img"
                          src={(() => {
                            try {
                              return require(`../../assets/brewed-in-chaos/package-face/${product.code}.png`);
                            } catch (error) {
                              return require(`../../assets/brewed-in-chaos/package-face/default.png`);
                            }
                          })()}
                          alt="Product Image"
                          sx={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            p: 1,
                          }}
                        />
                      </TableCell>
                      {/* <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(product._id)}
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={4} p={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Typography variant="h6">Add Product</Typography>{" "}
                <TextField
                  {...register("name")}
                  label="Name"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.name?.message}
                />
                <TextField
                  {...register("code")}
                  label="Code"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.code?.message}
                />
                <TextField
                  {...register("category")}
                  label="Category"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.category?.message}
                />
                <TextField
                  {...register("price")}
                  label="Price"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.price?.message}
                />
                <TextField
                  {...register("promo")}
                  label="Promo"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.promo?.message}
                />
                <TextField
                  {...register("acidity")}
                  label="Acidity"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.acidity?.message}
                />
                <TextField
                  {...register("roast")}
                  label="Roast"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.roast?.message}
                />
                <TextField
                  {...register("processing")}
                  label="Processing"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.processing?.message}
                />
                <TextField
                  {...register("description")}
                  label="Description"
                  variant="filled"
                  fullWidth
                  sx={{ bgcolor: "light.main" }}
                  helperText={errors.description?.message}
                />
                <Button sx={{ mt: 2 }} type="submit">
                  Add
                </Button>
              </Stack>
            </form>
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
                🚀 Successfully submitted!
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProductListPage;
