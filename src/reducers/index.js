import { combineReducers } from "redux";
import searchFilterReducer from "./searchFilterReducer";

export default combineReducers({
  searchFilter: searchFilterReducer,
});
