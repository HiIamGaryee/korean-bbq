import api from "../../utils/axiosConfig";

type BestSellerResponse = {
  // data: {
  //   data: Product[];
  //   page: {
  //     total: number;
  //     nextOffset: number;
  //     previousOffset: number;
  //     limit: number;
  //   };
  // };
  data: Product[];
  page: {
    total: number;
    nextOffset: number;
    previousOffset: number;
    limit: number;
  };
};

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  acidity: string;
  roast: string;
  processing: string;
  description: string;
};

// Update your API call function to use this type
export const getBestSeller = async (
  limit = 10,
  offset = 0
): Promise<BestSellerResponse> => {
  try {
    const response = await api.get<BestSellerResponse>("/bestseller", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch best seller:", error?.response?.data);
    throw error;
  }
};
