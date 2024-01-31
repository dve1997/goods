export const loading = (price, type, search) => ({
  type: "loading",
  payload: { price, type, search },
});
export const loaded = (payload) => ({ type: "loaded", payload });
export const error = () => ({ type: "error" });
export const getProduct = (payload) => ({ type: "product", payload });
export const createProduct = (payload) => ({ type: "create", payload });
export const deleteProduct = (payload) => ({ type: "delete", payload });
