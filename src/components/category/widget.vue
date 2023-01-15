<template>
  <div class="category_detail">
    <div class="list-group mb-3">
      <div class="list-group-item d-flex align-items-center">
        <img :src="image" alt="" v-if="image" />
        <div class="flex-fill ps-3 pe-3" v-if="_category">
          <div class="fw-600">{{ _category.name }}</div>
          <div class="fs-12px text-muted">
            <span v-for="(filter, findex) in _category.filters" :key="findex">
              {{ filter.name }} : {{ filter.values }} <br />
            </span>
          </div>
        </div>
        <div class="flex-fill ps-3 pe-3" v-if="!_category">
          <div class="fw-600">Chọn danh mục</div>
        </div>
        <div class="dropdown">
          <a href="#" data-bs-toggle="dropdown" class="text-muted"
            ><i class="fa fa-ellipsis-h"></i
          ></a>
          <div class="dropdown-menu dropdown-menu-right">
            <a
              @click="deleteCategory"
              class="dropdown-item"
              data-bs-toggle="modal"
              :data-bs-target="'#modalCategory' + index"
              >Update</a
            >
          </div>
          <category-modal
            :index="index"
            @setProductCategory="setProductCategory($event, selectcategory)"
          >
          </category-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryModal from "./CategoryModal.vue";
import { computed } from "vue";
import { ImageService } from "../../services/image.service";

export default {
  components: { CategoryModal },
  props: {
    category: {},
    image: "",
    index: Number,
  },
  data() {
    return {
      _category: this.category,
    };
  },
  computed: {
    _image: {
      async get() {
        if (this.image) return image;
        if (this._category?.image)
          return await ImageService.getBlobSrc(this._category?.image);
      },
    },
  },
  methods: {
    setProductCategory(selectcategory) {
      this._category = selectcategory;
      console.log(this.$store.state.listProduct, this.index);
      this.$store.state.listProduct[this.index].category = selectcategory;
    },
  },
};
</script>
<style>
.category_detail img {
  max-width: 50px;
}
</style>