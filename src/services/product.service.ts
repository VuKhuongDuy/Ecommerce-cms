import { listProduct, Product01 } from "@/enums/mockdata";

export const ProductService = () => ({
  createOne(data: any) {
    return Product01;
  },
  getAll() {
    return listProduct;
  },
  getOne(id: number) {
    return Product01;
  },
  updateOne(data: any) {
    return Product01;
  },
  deleteOne(id: number) {
    return true;
  },
});
