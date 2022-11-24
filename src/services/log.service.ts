import { ListLog, Log } from "@/enums/mockdata";

export const LogService = () => ({
  createOne(data: any) {
    return Log;
  },
  getAll() {
    return ListLog;
  },
  getOne(id: number) {
    return Log;
  },
  editOne(data: any) {
    return Log;
  },
  deleteOne(id: number) {
    return true;
  },
});
