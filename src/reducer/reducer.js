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
    case "product":
      return {
        ...state,
        getProduct: active.payload,
      };
    case "create":
      return {
        ...state,
        createProduct: active.payload,
      };
    case "delete":
      return {
        ...state,
        deletePoduct: active.payload,
      };
    default:
      break;
  }
};

export default reducer;
