export const mutations = {
  setUser(state: any, user: any) {
    state.user = user;
  },
  setListuser(state: any, listUser: any) {
    state.listUser = listUser;
  },
  setCategory(state: any, category: any) {
    state.category = category;
  },
  setListcategory(state: any, listCategory: any) {
    state.listCategory = listCategory;
  },
  setProduct(state: any, product: any) {
    state.product = product;
  },
  setListproduct(state: any, listProduct: any) {
    state.listProduct = listProduct;
  },
  setOrder(state: any, order: any) {
    state.order = order;
  },
  setListorder(state: any, listOrder: any) {
    state.listOrder = listOrder;
  },
  setDiscount(state: any, discount: any) {
    state.discount = discount;
  },
  setListdiscount(state: any, listDiscount: any) {
    state.listDiscount = listDiscount;
  },
  setCart(state: any, cart: any) {
    state.cart = cart;
  },
  setListcart(state: any, listCart: any) {
    state.listCart = listCart;
  },
  setLog(state: any, log: any) {
    state.log = log;
  },
  setListlog(state: any, listLog: any) {
    state.listLog = listLog;
  },
  setPost(state: any, post: any) {
    state.post = post;
  },
  setListpost(state: any, listPost: any) {
    state.listPost = listPost;
  },
  setListDiscountProduct(state: any, listDiscountProduct: any) {
    state.listDiscountProduct = listDiscountProduct;
  },
  setShowSearchResult(state: any, showSearchResult: any) {
    state.showSearchResult = showSearchResult;
  },
  setUploadFile(state: any, uploadFile: any) {
    state.uploadFile = uploadFile;
  },
  setUploadFiles(state: any, uploadFiles: any) {
    state.uploadFiles = uploadFiles;
  },
  setPreviewFile(state: any, previewFile: any) {
    state.previewFile = previewFile;
  },
  setPreviewFiles(state: any, previewFiles: any) {
    state.previewFiles = previewFiles;
  },
  setUploadThumbnail(state: any, uploadThumbnail: any) {
    state.uploadThumbnail = uploadThumbnail;
  },
  setPreviewThumbnail(state: any, previewThumbnail: any) {
    state.previewThumbnail = previewThumbnail;
  },
  addFiles(
    state: any,
    data: {
      keyListFile: string;
      index1: number;
      src: string;
      file: any;
    }
  ) {
    const { keyListFile, index1, src, file } = data;
    let currentStateList = state[keyListFile][index1];
    currentStateList = [
      ...currentStateList,
      {
        data: src,
        type: file.type,
      },
    ];
  },
  removeFileAtIndex(
    state: any,
    data: {
      keyListFile: string;
      keyUploadFile: string;
      index1: number;
      index2: number;
    }
  ) {
    const { keyListFile, keyUploadFile, index1, index2 } = data;
    state[keyListFile]?.[index1].splice(index2, 1);
    state[keyUploadFile]?.[index1].splice(index2, 1);
  },
};
