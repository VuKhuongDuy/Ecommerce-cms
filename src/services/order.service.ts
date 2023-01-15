import { ListOrder, Order01 } from "@/enums/mockdata";
import { httpClient } from './httpClient';

export const OrderService = () => ({
  createOne(data: any) {
    return Order01;
  },
  async getAll() {
    const response: any = await httpClient.get("/order?q=&limit=10&page=1")
    return response.data.data
  },
  getOne(id: number) {
    return Order01;
  },
  editOne(data: any) {
    return Order01;
  },
  deleteOne(id: number) {
    return true;
  },
});
