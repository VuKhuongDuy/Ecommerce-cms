import { GenderUser, RoleUser } from "./user.enum";

export const User01 = {
  id: 1,
  username: "User name",
  password: "password",
  role: RoleUser.ADMIN,
  phone: "013456789",
  birthday: "2022/12/12",
  address: "Address test 123, Hanoi",
  sex: GenderUser.MALE,
  email: "admin_email_test@mail.com",
};

export const User02 = {
  id: 2,
  username: "User name2",
  password: "password2",
  role: RoleUser.NORMAL,
  phone: "013456799",
  birthday: "2022/12/12",
  address: "Address test 456, Hanoi",
  sex: GenderUser.MALE,
  email: "admin_normal_test@mail.com",
};

export const ListUser = [User01, User02];

export const Category01 = {
  id: 1,
  name: "Category 1",
};

export const Category02 = {
  id: 1,
  name: "Category 1",
};

export const ListCategories = [Category01, Category02];
const productImgUrl = "/assets/img/product/product-6.jpg";

export const ProductProperty01 = {
  name: "Color",
  value: [
    {
      id: "color_red",
      name: "red",
      media: {
        url: "http://url",
        type: "video",
      },
    },
    { id: "color_yellow", name: "yellow" },
  ],
};

export const ProductPropery02 = {
  name: "Size",
  values: [{ id: "size_s", name: "s" }],
};

export const Product01 = {
  id: 1,
  name: "Product 1",
  description:
    "Description loremLorem tempor duis fugiat eiusmod eiusmod esse aute mollit duis incididunt adipisicing.",
  addinfo: "addinfo",
  default_price: 15.0,
  selling_price: 12.0,
  sku: "sku ",
  slug: "product-1",
  saleCount: 15,
  category_id: Category01.id,
  thumb_image: productImgUrl,
  new: true,
  featured: true,
  best_seller: true,
  stop_sell: true,
  images: [
    {
      url: productImgUrl,
      type: "type01",
    },
    {
      url: productImgUrl,
      type: "type02",
    },
  ],
  filters: [
    {
      name: "price",
      value: 20000,
      type: "number",
    },
    {
      name: "origin",
      value: ["us", "ja"],
      type: "string",
    },
  ],
  properties: [ProductProperty01, ProductPropery02],
};

export const Product02 = {
  id: 1,
  name: "Product 2",
  description:
    "Description loremLorem tempor duis fugiat eiusmod eiusmod esse aute mollit duis incididunt adipisicing.",
  price: 10.0,
  default_price: 16.0,
  selling_price: 14.0,
  sku: "sku ",
  slug: "product-3",
  saleCount: 20,
  category_id: Category01.id,
  thumb_image: productImgUrl,
  new: false,
  featured: false,
  best_seller: false,
  stop_sell: false,
  images: [
    {
      url: productImgUrl,
      type: "type01",
    },
    {
      url: productImgUrl,
      type: "type02",
    },
  ],
  properties: [
    {
      name: "Color",
      value: [ProductProperty01, ProductPropery02],
    },
    {
      name: "Size",
      values: [{ id: "size_s", name: "s" }],
    },
  ],
};

export const listProduct = [Product01, Product02];

export const Discount01 = {
  id: 1,
  name: "Discount01",
  start_time: new Date("1999/09/09 00:00:00"),
  end_time: new Date("1999/09/09 00:00:00"),
  default_percent_discount: 10,
  list_product: [
    {
      productId: 1,
      price: 499000.0,
      percent: 50,
    },
  ],
  create_at: new Date("1999/09/09 00:00:00"),
  update_at: new Date("1999/09/09 00:00:00"),
};

export const Discount02 = {
  id: 1,
  name: "Discount02",
  start_time: new Date("2999/09/09 00:00:00"),
  end_time: new Date("2999/09/09 00:00:00"),
  default_percent_discount: 10,
  list_product: [
    {
      productId: 1,
      price: 599000.0,
      percent: 50,
    },
  ],
  create_at: new Date("1999/09/09 00:00:00"),
  update_at: new Date("1999/09/09 00:00:00"),
};

export const Discount03 = {
  id: 1,
  name: "Discount02",
  start_time: new Date("1999/09/09 00:00:00"),
  end_time: new Date("2999/09/09 00:00:00"),
  default_percent_discount: 10,
  list_product: [
    {
      productId: 1,
      price: 699000.0,
      percent: 70,
    },
  ],
  create_at: new Date("1999/09/09 00:00:00"),
  update_at: new Date("1999/09/09 00:00:00"),
};

export const ListDiscount = [Discount01, Discount02, Discount03];

export const Order01 = {
  id: 1,
  user_order_id: User01,
  list_prodcuct: [
    {
      product: Product01,
      discountEvent: Discount03,
      property: {
        name: ProductProperty01.name,
        id: ProductProperty01.value.find((e) => e.id === "color_red"),
      },
    },
  ],
  state: "DONE",
  voucher: Discount01,
  create_at: new Date("1999/09/09 00:00:00"),

};

export const Order02 = {
  id: 2,
  user_order_id: User01,
  list_prodcuct: [
    {
      product: Product01,
      discountEvent: Discount01,
      property: {
        name: ProductProperty01.name,
        id: ProductProperty01.value.find((e) => e.id === "color_yellow"),
      },
    },
  ],
  state: "",
  voucher: Discount02,
  create_at: new Date("1999/09/09 00:00:00"),

};

export const ListOrder = [Order01, Order02];

export const Cart = {
  user_id: 1,
  list_product: [
    {
      id: 1,
      count: 2,
      property: {
        name: ProductProperty01.name,
        id: ProductProperty01.value.find((e) => e.id === "color_red"),
      },
    },
  ],
};

export const Log = {
  id: 1,
  actor: User01,
  type: "UPDATE",
  table: "Order",
  content: "UPDATE status = 1 WHERE id =1  ",
  created_at: new Date("1999/09/09 00:00:00"),
  updated_at: new Date("1999/09/09 00:00:00"),
  deleted_at: new Date("1999/09/09 00:00:00"),
};

export const ListLog = [Log, Log];

export const Post01 = {
  id: 1,
  title: "POST 01",
  description: "Description",
  slug: "slug",
  thumnail:
    "https://resources.trifocal.eu.com/wp-content/uploads/2018/06/temp-logo-img.png",
  post_content:
    "Voluptate fugiat nisi esse et dolore laboris cupidatat magna culpa enim consectetur aliquip nulla occaecat.",
  created_at: new Date("1999/09/09 00:00:00"),
};

export const Post02 = {
  id: 2,
  title: "POST 02",
  post_content:
    "Amet sunt occaecat excepteur nulla non non cupidatat nulla qui.",
  created_at: new Date("1999/09/09 00:00:00"),
};

export const ListPost = [Post01];
