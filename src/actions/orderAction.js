import { CHECKOUT_ORDER } from "./types";
import { SET_SHIPPING_ORDER } from "./types";

export const checkoutItems = (carts, isChange) => (dispatch) => {
    dispatch({
        type: CHECKOUT_ORDER,
        payload: {
            carts: carts, 
            isChange: isChange
        } 
    })
};

export const setShippingOrder = (filter) => (dispatch) => {
    dispatch({
        type: SET_SHIPPING_ORDER,
        payload: filter,
    })
};

