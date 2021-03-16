import { combineReducers } from "redux";
import searchFilterReducer from "./searchFilterReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  searchFilter: searchFilterReducer,
  orders: orderReducer,
});
