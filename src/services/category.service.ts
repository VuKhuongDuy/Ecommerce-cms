import { Category01, ListCategories } from "@/enums/mockdata";
import { httpClient } from "./httpClient";
export const CategoryService = () => ({
  async getAll(page = 1) {
    const response = await httpClient.get("/category?q=&limit=10&page=1");
    return response.data.data;
  },

  async getAllNotPage(page = 1) {
    const response = await httpClient.get("/category?q=&limit=10000&page=1");
    return response.data.data;
  },

  async getCategoryPage(page = 1) {
    const response = await httpClient.get("/category?q=&limit=10000&page=1");
    return response.data.data;
  },

  async getOne(id: number) {
    const response = await httpClient.get("/category?q=&limit=1&page=1");
    console.log(response);
    return response;
  },

  async createOne(category: any) {
    return await httpClient.post("/category", category);
  },

  async updateOne(category: any) {
    return await httpClient.put("/category", category);
  },

  async deleteOne(categoryId: string) {
    return await httpClient.delete(`/category/${categoryId}`);
  },

  async searchCategory(text: string) {
    const response = await httpClient.get(`/category?q=${text}&limit=10&page=1`)
    return response.data.data.data;
  },

  async findCategory(searchData: { q?: string, limit: number, page: number }) {
    let query = []
    for (const [key, value] of Object.entries(searchData)) {
      query.push(`${key}=${value}`);
    }

    const response = await httpClient.get(
      `/category?${query.join("&")}`
    );
    return response.data.data;
  },
});
