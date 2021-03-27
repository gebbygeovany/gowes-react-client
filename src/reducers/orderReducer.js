import { CHECKOUT_ORDER, SET_SHIPPING_ORDER, ADD_ORDER } from "../actions/types";
import { initialOrderList } from "../util/const";

const initialState = initialOrderList;

export default function (state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_ORDER:
      return {
        ...state,
        checkoutOrders: action.payload.carts,
        isChange: action.payload.isChange,
        isChecked: action.payload.isChecked
      };
    case ADD_ORDER:
      return {
        ...state,
        isAddOrder: action.payload.isAddOrder
      };
    case SET_SHIPPING_ORDER:
      return {
        ...state,
        shippingOrders: action.payload,
      };
    default:
      return state;
  }
}
