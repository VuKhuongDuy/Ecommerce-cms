import axios from "axios";
import { httpClient } from "./httpClient";

export class ImageService {
  static async getPresignUrlImageProduct(file_name: string) {
    return await httpClient.get(`/product/s3?image_name=${file_name}`);
  }

  static async uploadFile(formData: any) {
    console.log(formData)
    await axios.post("http://localhost:9000/ecommerce", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static isImageFile(file: string) {
    // console.log(file.type, new RegExp(/^image/).test(file.type))
    return new RegExp(/^data:image/).test(file);
  }
}
