import { Box, Button, TextField, Paper } from "@mui/material";
import React, { useState } from "react";
import Layout from "../../Layout";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppMutation } from "../../hooks/useAppMutation";
import {
  postBestSeller,
  BestSellerParams,
  getBestSeller,
} from "../../api/admin";

const AddListingPage = () => {
  const { data: BestSellerList } = useQuery({
    queryKey: ["getBestSeller", 10, 0], // Includes parameters in the query key
    queryFn: () => getBestSeller(10, 0), // Calls the function with parameters
  });

  const validationSchema = Yup.object({
    code: Yup.string().required("Email is required"),
    name: Yup.string().required("name is required"),
    img: Yup.string(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BestSellerParams>({
    resolver: yupResolver(validationSchema),
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, reset } = useAppMutation(postBestSeller, {
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  const onSubmit = (data: BestSellerParams) => {
    mutate(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          // component="form"
          // noValidate
          // autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            {...register("code")}
            label="code"
            variant="filled"
            sx={{ bgcolor: "light.main" }}
            helperText={errors.code?.message}
          />
          <TextField
            {...register("name")}
            label="Name"
            variant="filled"
            sx={{ bgcolor: "light.main" }}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("img")}
            label="img"
            variant="filled"
            sx={{ bgcolor: "light.main" }}
            helperText={errors.img?.message}
          />

          <Button sx={{ mt: 2 }} type="submit">
            Submit
          </Button>
        </Box>
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
      </form>
    </Layout>
  );
};

export default AddListingPage;
