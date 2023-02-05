import { httpClient } from "./httpClient";

export const BannerService = () => ({
    async createOne(data: any) {
        return await httpClient.post("/banner", data);
    },
    async editOne(data: any) {
        const response = await httpClient.put("/banner", data);
        return response.data.data
    },
    async deleteOne(id: number) {
        const response = await httpClient.delete(`/banner/${id}`);
        return response.data.data
    },
    async findBanner(searchData: { q?: string, limit: number, page: number }) {
        let query = []
        for (const [key, value] of Object.entries(searchData)) {
            query.push(`${key}=${value}`);
        }

        const response = await httpClient.get(
            `/banner?${query.join("&")}`
        );
        return response.data;
    },
});
