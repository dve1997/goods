const reducer = (state, active) => {
  switch (active.type) {
    case "loading":
      return {
        ...state,
        statusLoading: "loading",
        filterPrice: active.payload.price,
        filterType: active.payload.type,
        filterSearch: active.payload.search,
      };
    case "loaded":
      return {
        ...state,
        statusLoading: "loaded",
        goods: active.payload,
      };
    case "error":
      return {
        ...state,
        statusLoading: "error",
      };
    default:
      break;
  }
};

export default reducer;
