<template>
  <div>
    <div class="input-group mb-4 search_category">
      <div class="flex-fill position-relative">
        <div class="input-group">
          <input
            type="text"
            class="form-control ps-35px"
            placeholder="Filter orders"
            @keyup="(event) => findCategory(event)"
          />
          <div
            class="
              input-group-text
              position-absolute
              top-0
              bottom-0
              bg-none
              border-0
            "
            style="z-index: 1020"
          >
            <i class="fa fa-search opacity-5"></i>
          </div>
        </div>
      </div>

      <div class="preview_category" v-if="showSelections">
        <ul>
          <li v-for="category in listCategory" :key="category.id">
            <div class="list-group" @click="selectCategory(category)">
              <div class="list-group-item d-flex align-items-center">
                <div class="flex-fill">
                  <div class="fw-600">{{ category.name }}</div>
                  <div class="fs-12px text-muted">
                    <span
                      v-for="(filter, findex) in category.filters"
                      :key="findex"
                    >
                      {{ filter.name }} : {{ filter.values }} <br />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="selected_category" v-if="category.id">
      <div class="list-group mb-3">
        <div class="list-group-item d-flex align-items-center">
          <div
            class="
              w-40px
              h-40px
              d-flex
              align-items-center
              justify-content-center
              bg-gradient-cyan-blue
              text-white
              rounded-2
              ms-n1
            "
          >
            <i class="fab fa-apple fa-lg"></i>
          </div>
          <div class="flex-fill ps-3 pe-3">
            <div class="fw-600">{{ category.name }}</div>
            <div class="fs-12px text-muted">
              <span v-for="(filter, findex) in category.filters" :key="findex">
                {{ filter.name }} : {{ filter.values }} <br />
              </span>
            </div>
          </div>
          <div class="dropdown">
            <a href="#" data-bs-toggle="dropdown" class="text-muted"
              ><i class="fa fa-ellipsis-h"></i
            ></a>
            <div class="dropdown-menu dropdown-menu-right">
              <a @click="deleteCategory" class="dropdown-item">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CategoryService } from "../../services/category.service";

export default {
  data() {
    return {
      searchCategory: [],
      showSelections: false,
    };
  },
  computed: {
    listCategory: {
      get() {
        return this.$store.state.listCategory;
      },
    },
    category: {
      get() {
        return this.$store.state.category;
      },
    },
  },
  methods: {
    async findCategory(event) {
      this.showSelections = true;
      const text = event.target.value;
      const response = await CategoryService().searchCategory(text);
      console.log(response);
      this.$store.commit("setListcategory", response);
    },
    selectCategory(category) {
      this.showSelections = false;
      this.$store.commit("setCategory", category);
    },
    deleteCategory() {
      this.$store.commit("setCategory", {});
    },
  },
};
</script>

<style scoped>
.search_category {
  position: relative;
}

.preview_category {
  cursor: pointer;
  z-index: 9;
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  height: 100%;
}

.preview_category ul {
  list-style: none;
  padding-left: 0px;
}

.preview_category .list-group-item:hover {
  background: antiquewhite;
}
</style>