import { Discount01, ListDiscount } from "@/enums/mockdata";

export const DiscountService = () => ({
  createOne(data: any) {
    return;
  },
  getAll() {
    return ListDiscount;
  },
  getOne(id: number) {
    return Discount01;
  },
  editOne(data: any) {
    return Discount01;
  },
  deleteOne(id: number) {
    return true;
  },
});
