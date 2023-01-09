import axios from "axios";
import { httpClient } from "./httpClient";

export class ImageService {
  static async getPresignUrlImageProduct(file_name: string) {
    return await httpClient.get(`/s3/presign?imageName=${file_name}`);
  }

  static async uploadFile(formData: any) {
    const file = formData.get("file");
    console.log(file)
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
    const res = await fetch(`http://localhost:9000/ecommerce/images/${minioUrl}`)
    console.log(res)
  const blob = await res.blob()
  return URL.createObjectURL(blob)
  }
}