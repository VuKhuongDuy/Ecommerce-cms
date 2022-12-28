import { ListOrder, Order01 } from "@/enums/mockdata";

export const OrderService = () => ({
  createOne(data: any) {
    return Order01;
  },
  getAll() {
    return ListOrder;
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
