<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">PAGES</a></li>
        <li class="breadcrumb-item active">User</li>
      </ul>
      <h1 class="page-header mb-0">User</h1>
    </div>

    <div class="ms-auto">
      <a href="#" class="btn btn-primary"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Create User</a
      >
      <a href="#" class="btn btn-danger ms-2"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Delete User</a
      >
    </div>
  </div>

  <div class="mb-md-4 mb-3 d-md-flex">
    <div class="mt-md-0 mt-2">
      <a href="#" class="text-dark text-decoration-none"
        ><i class="fa fa-download fa-fw me-1 text-muted"></i> Export</a
      >
    </div>
    <div class="ms-md-4 mt-md-0 mt-2 dropdown-toggle">
      <a
        href="#"
        data-bs-toggle="dropdown"
        class="text-dark text-decoration-none"
        >More Actions</a
      >
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div role="separator" class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </div>
    </div>
  </div>

  <card>
    <ul class="nav nav-tabs nav-tabs-v2 px-4">
      <li class="nav-item me-3">
        <a href="#allTab" class="nav-link active px-2" data-bs-toggle="tab"
          >All</a
        >
      </li>
      <li class="nav-item me-3">
        <a href="#publishedTab" class="nav-link px-2" data-bs-toggle="tab"
          >Unfulfilled</a
        >
      </li>
      <li class="nav-item me-3">
        <a href="#expiredTab" class="nav-link px-2" data-bs-toggle="tab"
          >Unpaid</a
        >
      </li>
    </ul>
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="allTab">
        <!-- BEGIN input-group -->
        <div class="input-group mb-4">
          <div class="flex-fill position-relative">
            <div class="input-group">
              <input
                type="text"
                class="form-control ps-35px"
                placeholder="Filter users"
              />
              <div
                class="input-group-text position-absolute top-0 bottom-0 bg-none border-0"
                style="z-index: 1020"
              >
                <i class="fa fa-search opacity-5"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th class="border-top-0 pt-0 pb-2"></th>
                <th class="border-top-0 pt-0 pb-2">ID</th>
                <th class="border-top-0 pt-0 pb-2">Name</th>
                <th class="border-top-0 pt-0 pb-2">Role</th>
                <th class="border-top-0 pt-0 pb-2">Address</th>
                <th class="border-top-0 pt-0 pb-2">Phone</th>
                <th class="border-top-0 pt-0 pb-2">Email</th>
                <th class="border-top-0 pt-0 pb-2">Sex</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="product1"
                    />
                    <label class="form-check-label" for="product1"></label>
                  </div>
                </td>
                <td class="align-middle"><a href="#">#1950</a></td>
                <td class="align-middle">Thu 26 Nov, 12:23pm</td>
                <td class="align-middle">Amanda Lee</td>
                <td>$398.00</td>
                <td class="py-1 align-middle">
                  <span
                    class="badge bg-teal text-teal-800 bg-opacity-25 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle text-teal fs-9px fa-fw me-5px"></i>
                    Paid</span
                  >
                </td>
                <td class="align-middle">
                  <span
                    class="badge bg-gray-100 text-black text-opacity-50 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i
                      class="fa fa-circle text-gray-500 fs-9px fa-fw me-5px"
                    ></i>
                    Fulfilled</span
                  >
                </td>
                <td class="align-middle">3 items</td>
              </tr>
              <tr>
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="product2"
                    />
                    <label class="form-check-label" for="product2"></label>
                  </div>
                </td>
                <td class="align-middle"><a href="#">#1949</a></td>
                <td class="align-middle">Thu 26 Nov, 11:54am</td>
                <td class="align-middle">Leonard Oii</td>
                <td>$496.00</td>
                <td class="py-1 align-middle">
                  <span
                    class="badge bg-teal text-teal-800 bg-opacity-25 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle text-teal fs-9px fa-fw me-5px"></i>
                    Paid</span
                  >
                </td>
                <td class="align-middle">
                  <span
                    class="badge bg-gray-100 text-black text-opacity-50 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i
                      class="fa fa-circle text-gray-500 fs-9px fa-fw me-5px"
                    ></i>
                    Fulfilled</span
                  >
                </td>
                <td class="align-middle">1 item</td>
              </tr>
              <tr>
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="product3"
                    />
                    <label class="form-check-label" for="product3"></label>
                  </div>
                </td>
                <td class="align-middle"><a href="#">#1948</a></td>
                <td class="align-middle">Thu 25 Nov, 11:54pm</td>
                <td class="align-middle">John Doe</td>
                <td>$195.00</td>
                <td class="py-1 align-middle">
                  <span
                    class="badge bg-orange bg-opacity-20 text-orange px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle fs-9px fa-fw me-5px"></i>
                    Pending</span
                  >
                </td>
                <td class="align-middle">
                  <span
                    class="badge bg-yellow bg-opacity-50 text-black text-opacity-50 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle fs-9px fa-fw me-5px"></i>
                    Unfulfilled</span
                  >
                </td>
                <td class="align-middle">2 items</td>
              </tr>
              <tr>
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="product4"
                    />
                    <label class="form-check-label" for="product4"></label>
                  </div>
                </td>
                <td class="align-middle"><a href="#">#1947</a></td>
                <td class="align-middle">Thu 25 Nov, 11:53pm</td>
                <td class="align-middle">Terry Ng</td>
                <td>$195.00</td>
                <td class="py-1 align-middle">
                  <span
                    class="badge bg-orange bg-opacity-20 text-orange px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle fs-9px fa-fw me-5px"></i>
                    Pending</span
                  >
                </td>
                <td class="align-middle">
                  <span
                    class="badge bg-yellow bg-opacity-50 text-black text-opacity-50 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle fs-9px fa-fw me-5px"></i>
                    Unfulfilled</span
                  >
                </td>
                <td class="align-middle">2 items</td>
              </tr>
              <tr>
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="product5"
                    />
                    <label class="form-check-label" for="product5"></label>
                  </div>
                </td>
                <td class="align-middle"><a href="#">#1946</a></td>
                <td class="align-middle">Thu 25 Nov, 11:52pm</td>
                <td class="align-middle">Terry Ng</td>
                <td>$195.00</td>
                <td class="py-1 align-middle">
                  <span
                    class="badge bg-orange bg-opacity-20 text-orange px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle fs-9px fa-fw me-5px"></i>
                    Pending</span
                  >
                </td>
                <td class="align-middle">
                  <span
                    class="badge bg-yellow bg-opacity-50 text-black text-opacity-50 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"
                    ><i class="fa fa-circle fs-9px fa-fw me-5px"></i>
                    Unfulfilled</span
                  >
                </td>
                <td class="align-middle">2 items</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- END table -->

        <div class="d-md-flex align-items-center">
          <div class="me-md-auto text-md-left text-center mb-2 mb-md-0">
            Showing 1 to 10 of 57 entries
          </div>
          <ul class="pagination mb-0 justify-content-center">
            <li class="page-item disabled">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item"><a class="page-link" href="#">6</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </div>
      </div>
    </div>
  </card>
</template>
