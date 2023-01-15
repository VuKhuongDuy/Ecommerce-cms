import axios from "axios";
import { httpClient } from "./httpClient";

export class ImageService {
  static async getPresignUrlImageProduct(file_name: string) {
    return await httpClient.get(`/product/s3?image_name=${file_name}`);
  }

  static async uploadFile(formData: any) {
    const file = formData.get("file");
    await axios.post("http://localhost:9000/ecommerce", formData, {
      headers: { 
        'Content-Type': file.type,
        "Content-Disposition": `attachment; filename=${file.name}`
      },
    });
  }

  static isImageFile(file: string) {
    // console.log(file.type, new RegExp(/^image/).test(file.type))
    return new RegExp(/^data:image/).test(file);
  }

  static async getBlobSrc(minioUrl: string){
    // if(!minioUrl) throw new Error("blable")
    const res = await fetch(`http://localhost:9000/ecommerce/${minioUrl}`)
  const blob = await res.blob()
  return URL.createObjectURL(blob)
  }

  static uploadMultiplePresign(listFile: File[] = [], presignDatas: object[] = []) {
      listFile.forEach((file, index) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(presignDatas[index])) {
          formData.append(key, value);
        }
        formData.append("file", file);
        this.uploadFile(formData);
      });
    }
}
