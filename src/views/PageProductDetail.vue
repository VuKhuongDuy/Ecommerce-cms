<script>
import { useAppOptionStore } from "@/stores/app-option";
import VueSelect from "@/components/plugins/VueSelect.vue";

const appOption = useAppOptionStore();

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      default_price: "",
      selling_price: "",
      sku: "",
      slug: "",
      categor: "",
      category: [],
      listCategory: [
        { name: "javascript", id: "adfa" },
        { name: "css", id: "asd" },
        { name: "html", id: "31231" },
      ],
      newProduct: true,
      featured: true,
      bestSeller: false,
      properties: [
        {
          name: "Color",
          values: [
            { id: "color_red", name: "red" },
            { id: "color_red", name: "white" },
            { id: "color_red", name: "yellow" },
          ],
        },
        {
          name: "Size",
          values: [
            { id: "size_xl", name: "xl" },
            { id: "size_xxl", name: "xxl" },
            { id: "size_s", name: "s" },
          ],
        },
      ],
      images: [
        {
          url: "/assets/img/gallery/gallery-45.jpg",
          type: "image",
        },
        {
          url: "/assets/img/gallery/gallery-42.jpg",
          type: "image",
        },
        {
          url: "/assets/img/gallery/gallery-43.jpg",
          type: "image",
        },
        {
          url: "/assets/img/gallery/gallery-44.jpg",
          type: "image",
        },
        {
          url: "/assets/img/gallery/gallery-45.jpg",
          type: "image",
        },
        {
          url: "/assets/img/gallery/gallery-46.jpg",
          type: "image",
        },
        {
          url: "/assets/img/gallery/gallery-47.jpg",
          type: "image",
        },
        {
          url: "/assets/img/gallery/gallery-48.jpg",
          type: "image",
        },
      ],
    };
  },
  components: {
    VueSelect: VueSelect,
  },
  mounted() {
    appOption.appContentFullHeight = true;
    appOption.appContentClass = "p-0";
  },
  methods: {
    selectPropertyName: function (e) {
      const arr = e.target.value.split(",");
      const propertiesNew = [];
      arr.forEach((elem) => {
        const property = {
          name: elem,
          values: [],
        };
        const index = this.properties.findIndex((m) => m.name === elem);
        if (index >= 0) {
          property.values = this.properties[index].values;
        }

        propertiesNew.push(property);
      });
      this.properties = propertiesNew;
    },

    changePropertyValue: function (e, index) {
      const arr = e.target.value.split(",");
      arr.forEach((elem) => {
        const id = `${this.properties[index].name}-${elem}`;
        this.properties[index].values.push({
          id: id.replaceAll(" ", ""),
          name: elem,
        });
      });

      console.log(this.properties);
    },

    displayPropertyValue: function (property) {
      const arr = property.map((p) => {
        return p.name;
      });
      return arr.join(",");
    },
    displayPropertyName: function () {
      const arr = this.properties.map((p) => {
        return p.name;
      });
      return arr.join(",");
    },
    getListCategoryName: function () {
      return this.listCategory.map((m) => m.name);
    },
    removeImage: function (index) {
      this.images.removeAt(index);
    },
    selectFileUpload: function (e) {
      console.log({ e })
      const files = e.target.files;

    },
  },
  beforeUnmount() {
    appOption.appContentFullHeight = false;
    appOption.appContentClass = "";
  },
};
</script>
<template>
  <!-- BEGIN mailbox -->
  <div class="mailbox">
    <!-- END mailbox-toolbar -->
    <!-- BEGIN mailbox-body -->
    <div class="mailbox-body">
      <div class="mailbox-content">
        <form action="#" method="POST" name="email_form" class="h-100">
          <!-- BEGIN scrollbar -->
          <perfect-scrollbar class="h-100">
            <div class="mailbox-form d-flex flex-column h-100">
              <h2 class="mb-0 mt-2 ms-5">Chi tiết sản phẩm</h2>
              <div class="mailbox-form-header">
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Tên sản phẩm:</label>
                  <div class="col-lg me-5">
                    <input v-model="name" class="form-control" placeholder="" />
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Miêu tả::</label>
                  <div class="col-lg me-5">
                    <textarea v-model="description" class="form-control" placeholder="" rows="10" />
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Giá:</label>
                  <div class="w-200px input-group">
                    <input v-model="price" class="form-control" placeholder="" />
                    <div class="input-group-append">
                      <span class="input-group-text">vnđ</span>
                    </div>
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Giá gốc:</label>
                  <div class="w-200px input-group">
                    <input v-model="default_price" class="form-control" placeholder="" />
                    <div class="input-group-append">
                      <span class="input-group-text">vnđ</span>
                    </div>
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Giá niêm yết:</label>
                  <div class="w-200px input-group">
                    <input v-model="selling_price" class="form-control" placeholder="" />
                    <div class="input-group-append">
                      <span class="input-group-text">vnđ</span>
                    </div>
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Sku:</label>
                  <div class="w-200px">
                    <input v-model="sku" class="form-control" placeholder="" />
                  </div>
                </div>
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Category:</label>
                  <div class="col-lg me-5">
                    <vue-select :v-model="category" :options="getListCategoryName()"
                      placeholder="-- Select Multiple Options --" multiple></vue-select>
                  </div>
                </div>
                <hr />
                <div class="row align-items-center">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">New product:</label>
                  <div class="col-lg me-5">
                    <input class="form-check-input" v-model="newProduct" type="checkbox" value=""
                      id="flexCheckDefault" />
                  </div>
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Featured Product:</label>
                  <div class="col-lg me-5">
                    <input class="form-check-input" v-model="featured" type="checkbox" value="" id="flexCheckDefault" />
                  </div>
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Best seller product:</label>
                  <div class="col-lg me-5">
                    <input class="form-check-input" v-model="bestSeller" type="checkbox" value=""
                      id="flexCheckDefault" />
                  </div>
                </div>
                <hr />
                <div class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">Thuộc tính:</label>
                  <div class="col-lg me-5">
                    <input class="form-control" :value="displayPropertyName()"
                      placeholder="Các giá trị cách nhau bằng dấu ," v-on:keyup.enter="(e) => selectPropertyName(e)" />
                  </div>
                </div>
                <div v-for="(property, index) in properties" v-bind:key="property" class="row mb-2">
                  <label class="col-form-label w-200px px-2 fw-500 text-lg-end">{{ property.name }}:</label>
                  <div class="col-lg me-5">
                    <input class="form-control" :value="displayPropertyValue(property.values)"
                      placeholder="Các giá trị cách nhau bằng dấu ,"
                      v-on:keyup.enter="(e) => changePropertyValue(e, index)" />
                  </div>
                </div>
                <perfect-scrollbar>
                  <!-- BEGIN gallery-content -->
                  <div class="gallery-content">
                    <!-- BEGIN gallery -->
                    <div class="gallery">
                      <div class="gallery-title mb-3">
                        <a href="#">
                          Ảnh <i class="fa fa-chevron-right"></i>
                        </a>
                      </div>
                      <!-- BEGIN gallery-image -->
                      <div class="gallery-image">
                        <div class="mb-3 row align-items-center">
                          <label class="col-form-label w-200px px-2" for="multipleFile">Upload image/video:</label>
                          <input type="file" class="form-control col-form-label w-400px" id="multipleFile" multiple
                            @change="selectFileUpload" />
                        </div>
                        <ul class="gallery-image-list">
                          <div v-for="(item, index) in images" v-bind:key="index" class="wrap-image w-200px">
                            <button type="button" class="btn btn-danger inside-image"
                              v-on:click="() => removeImage(index)">
                              Xóa
                            </button>
                            <img :src="item.url" itemprop="thumbnail" alt="Image" class="img-portrait" width="200"
                              height="150" />
                          </div>
                        </ul>
                      </div>
                      <!-- END gallery-image -->
                    </div>
                    <!-- END gallery -->
                  </div>
                  <!-- END gallery-content -->
                </perfect-scrollbar>
              </div>
            </div>
          </perfect-scrollbar>
          <!-- END scrollbar -->
        </form>
      </div>
    </div>

    <!-- END mailbox-body -->
  </div>
  <!-- END mailbox -->
</template>
