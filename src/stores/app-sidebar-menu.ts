import { defineStore } from "pinia";

export const useAppSidebarMenuStore = defineStore({
  id: "appSidebarMenu",
  state: () => {
    return [
      {
        text: "Navigation",
        is_header: true,
      },
      {
        url: "/user",
        icon: "fa fa-user-circle",
        text: "User",
      },
      {
        url: "/product",
        icon: "fa fa-tv",
        text: "Products",
      },
      {
        url: "/category",
        icon: "fa fa-layer-group",
        text: "Category",
      },
      {
        url: "/order",
        icon: "fa fa-handshake",
        text: "Order",
      },
      {
        url: "/discount",
        icon: "fa fa-percent",
        text: "Discount",
      },
      {
        url: "/post",
        icon: "fa fa-pen",
        text: "Post",
      },
      {
        url: "/log",
        icon: "fa fa-file-alt",
        text: "Log",
      },
      {
        url: "/banner",
        icon: "fa fa-images",
        text: "Banner",
      },
      {
        is_divider: true,
      },
    ];
  },
});
