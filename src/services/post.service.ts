import { ListPost, Post01 } from "@/enums/mockdata";
import { httpClient } from "./httpClient";

export const PostService = () => ({
  async createOne(data: any) {
    return await httpClient.post("/api/v1/post", data);
  },
  async getAll() {
    return await httpClient.get("/api/v1/post");
  },
  async getPostPage(page = 1) {
    return await httpClient.get("/api/v1/post?q=&limit=10&page=1");
  },
  async getOne(id: number) {
    return Post01;
  },
  async editOne(data: any) {
    return Post01;
  },
  async deleteOne(id: number) {
    return true;
  },
});
