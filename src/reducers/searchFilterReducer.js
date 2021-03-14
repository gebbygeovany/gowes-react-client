import { SEARCH_FILTER } from "../actions/types";

const initialState = {
  filter: {
    keyword: "",
    category: "",
    condition: "",
    city: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
