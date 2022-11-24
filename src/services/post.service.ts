import { ListPost, Post01 } from "@/enums/mockdata";

export const ProductService = () => ({
  createOne(data: any) {
    return Post01;
  },
  getAll() {
    return ListPost;
  },
  getOne(id: number) {
    return Post01;
  },
  editOne(data: any) {
    return Post01;
  },
  deleteOne(id: number) {
    return true;
  },
});
