import { Discount01, ListDiscount } from "@/enums/mockdata";
import { httpClient } from "./httpClient";

export const DiscountService = () => ({
  async createOne(discount: any) {
    return await httpClient.post("discount", discount);
  },
  async getAll() {
    return ListDiscount;
  },
  async getOne(id: number) {
    return Discount01;
  },
  async editOne(data: any) {
    return Discount01;
  },
  async deleteOne(id: number) {
    return true;
  },

  async findProductPage(id: string, page:1){
    return await httpClient.get(`/discount/${id}/list-products?page=${page}`)
  }
});
