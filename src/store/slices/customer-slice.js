import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    isApiTruthy: true,
    isModal: false,
  },
  reducers: {
    getCustomers(state, actions) {
      const customers = actions.payload;
      state.customers = customers;
      state.isApiTruthy = false;
    },
    addCustomer(state, actions) {
      const userData = actions.payload;
      state.customers.push(userData);
    },
    editCustomer(state, actions) {
      const userData = actions.payload;
      const selectedCustomerIndex = state.customers.findIndex(
        (customer) => customer?.id === userData?.id
      );
      state.customers[selectedCustomerIndex] = userData;
    },
    deleteCustomer(state, actions) {
      const customerId = actions.payload;
      console.log(customerId);
      const deletedCustomerLists = state.customers.filter(
        (customer) => customer.id !== customerId
      );
      state.customers = deletedCustomerLists;
    },
    sorting(state, actions) {
      const dataIndex = actions.payload;
      if (dataIndex === "id") {
        state.customers.sort((a, b) => a[dataIndex] - b[dataIndex]);
      } else {
        state.customers.sort((a, b) => {
          if (a[dataIndex] < b[dataIndex]) return -1;
          return 0;
        });
      }
    },
  },
});

export const {
  getCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer,
  sorting,
} = customerSlice.actions;
export default customerSlice.reducer;
