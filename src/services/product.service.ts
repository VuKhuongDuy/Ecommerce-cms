import { listProduct, Product01 } from "@/enums/mockdata";
import { httpClient } from "./httpClient";

export const ProductService = () => ({
  async createOne(data: any) {
    return await httpClient.post("/product", data);
  },
  async getAll() {
    return listProduct;
  },
  async getProductPage(page = 1) {
    const response = await httpClient.get(
      `/product?q=&offset=1&limit=10&page=${page}`
    );
    return response.data.data;
  },

  async getPresignUrl(filename: string) {
    const response = await httpClient.get(`/product/s3?image_name=${filename}`);
    return response;
  },

  async getOne(id: number) {
    return Product01;
  },

  async updateOne(data: any) {
    const response = await httpClient.put(`/product`, data);
  },

  async deleteOne(id: number) {
    const response = await httpClient.delete(`/product/${id}`);
    return response.data.data
  },

  async findProduct(searchData: {q?: string, categorySlug?: string, limit: number, offset: number}) {
    let query = []
    for (const [key, value] of Object.entries(searchData)) {
      query.push( `${key}=${value}`);
    }

    const response = await httpClient.get(
      `/product?${query.join("&")}`
    );
    return response.data.data;
  },
});
