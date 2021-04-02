export const categoryOptions = [
  {
    key: "all",
    text: "All Categories",
    value: "all",
  },
  {
    key: "accessories",
    text: "Accessories",
    value: "accessories",
  },
  {
    key: "sparepart",
    text: "Sparepart",
    value: "sparepart",
  },
  {
    key: "apparel",
    text: "Apparel",
    value: "apparel",
  },
];

export const initialFilter = {
  filter: {
    keyword: "",
    category: "",
    condition: "",
    city: "",
    minPrice: -1,
    maxPrice: -1,
  },
};

export const initialOrderList = {
  checkoutOrders: [],
  isChange: false,
  isChecked: false,
  orderIds: [],
};
