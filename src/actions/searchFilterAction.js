import { SEARCH_FILTER } from "./types";

// export const getFilters = () => (dispatch) => {
//   fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((res) => res.json())
//     .then((posts) =>
//       dispatch({
//         type: FETCH_POSTS,
//         payload: posts,
//       })
//     );
// };

export const setFilter = (filter) => (dispatch) => {
    console.log("action called-filter condition", filter.condition)
    dispatch({
        type: SEARCH_FILTER,
        payload: filter,
      })
  };
  
