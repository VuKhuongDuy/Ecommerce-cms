import { Discount01, ListDiscount } from "@/enums/mockdata";
import { httpClient } from "./httpClient";

export const DiscountService = () => ({
  async createOne(discount: any) {
    return await httpClient.post("discount", discount);
  },
  async getAll() {
    return await httpClient.get(`/discount?q=&limit=10&page=1`)
  },
  async getOne(id: number) {
    return Discount01;
  },
  async editOne(data: any) {
    return await httpClient.put(`/discount`, data)

  },
  async deleteOne(id: number) {
    return await httpClient.delete(`/discount/${id}`)
  },

  async findProductPage(id: string, page:1){
    return await httpClient.get(`/discount/${id}/list-products?page=${page}`)
  },

  async findDiscount(searchData: {q?: string, limit: number, page: number}) {
    let query = []
    for (const [key, value] of Object.entries(searchData)) {
      query.push( `${key}=${value}`);
    }

    const response = await httpClient.get(
      `/discount?${query.join("&")}`
    );
    return response.data;
  },
});
