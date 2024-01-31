import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useReducer } from "react";

import { useHttp } from "./hooks/http.hook";
import reducer from "./reducer/reducer";
import { loaded, error, createProduct, deleteProduct } from "./actions/actions";

import HeaderGoods from "./components/headerGoods/HeaderGoods";
import FooterGoods from "./components/footerGoods/FooterGoods";
import ErrorPage from "./pages/errorPage/ErrorPage";
import ListGoodsPage from "./pages/listGoodsPage/ListGoodsPage";
import CreateProductPage from "./pages/createProductPage/CreateProductPage";
import InfoProductPage from "./pages/infoProductPage/InfoProductPage";

import "./App.scss";

export const GoodsContext = createContext(null);

function App() {
  const { getData, postData, deleteData } = useHttp();

  const initialState = {
    statusLoading: "loaded",
    goods: [],
    filterPrice: "all",
    filterType: "all",
    filterSearch: "",
    getProduct: {},
    createProduct: null,
    deletePoduct: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { Provider } = GoodsContext;

  useEffect(() => {
    if (state.createProduct != null) {
      postData("http://localhost:3001/goods", "POST", state.createProduct)
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
        .finally(() => dispatch(createProduct(null)));
    }

    if (state.deletePoduct != null) {
      deleteData("http://localhost:3001/goods/" + state.deletePoduct)
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
        .finally(() => dispatch(deleteProduct(null)));
    }

    getData("http://localhost:3001/goods")
      .then((data) => dispatch(loaded(data)))
      .catch((errorMessage) => {
        console.log(errorMessage);
        dispatch(error());
      });
  }, [state.createProduct, state.deletePoduct]);

  return (
    <div className="goods__wrapper">
      <div className="goods__conteiner">
        <Router>
          <Provider value={{ state, dispatch }}>
            <div className="goods__page">
              <header className="goods__header">
                <HeaderGoods />
              </header>
              <section className="goods__section">
                <Routes>
                  <Route path="/" element={<ListGoodsPage />} />
                  <Route path="/product/:id" element={<InfoProductPage />} />
                  <Route path="/create" element={<CreateProductPage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </section>
              <footer className="goods__footer">
                <FooterGoods />
              </footer>
            </div>
          </Provider>
        </Router>
      </div>
    </div>
  );
}

export default App;
