import { ListPost, Post01 } from "@/enums/mockdata";
import { httpClient } from "./httpClient";

export const PostService = () => ({
  async createOne(data: any) {
    return await httpClient.post("/post", data);
  },
  async getAll() {
    const response =  await httpClient.get("/post");
    return response.data.data
  },
  async getPostPage(page = 1) {
    const response = await httpClient.get("/post?q=&limit=10&page=1");
    return response.data.data
  },
  async getOne(id: number) {
    return Post01;
  },
  async editOne(data: any) {
    const response =  await httpClient.put("/post", data);
    return response.data.data
  },
  async deleteOne(id: number) {
    const response =  await httpClient.delete(`/post/${id}`);
    return response.data.data
  },

  async findPost(searchData: {q?: string, limit: number, page: number}) {
    let query = []
    for (const [key, value] of Object.entries(searchData)) {
      query.push( `${key}=${value}`);
    }

    const response = await httpClient.get(
      `/post?${query.join("&")}`
    );
    return response.data.data;
  },
});
