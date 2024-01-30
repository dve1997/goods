export const loading = (price, type, search) => ({
  type: "loading",
  payload: { price, type, search },
});
export const loaded = (payload) => ({ type: "loaded", payload });
export const error = () => ({ type: "error" });
