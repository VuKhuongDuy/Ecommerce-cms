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
    const response = await httpClient.get(`/product?q=&limit=10&page=${page}`);
    console.log(response.data.data);
    return response.data.data;
  },
  async getOne(id: number) {
    return Product01;
  },
  async updateOne(data: any) {
    return Product01;
  },
  async deleteOne(id: number) {
    return true;
  },
});
