import { Category01, ListCategories } from "@/enums/mockdata";
export const CategoryService = () => ({
  getAll() {
    return ListCategories;
  },

  getOne(id: number) {
    return Category01;
  },
});
