import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { GoodsContext } from "../../App";
import Spinner from "../../components/spinner/Spinner";
import { useHttp } from "../../hooks/http.hook";
import { loading } from "../../actions/actions";

import "./listGoods.scss";

const ListGoods = () => {
  const { state } = useContext(GoodsContext);
  const { goods, filterPrice, filterType, filterSearch } = state;

  const filterSearchGoods = (goods, search) => {
    if (search === "") {
      return goods;
    } else {
      return goods.filter((product) => product.name.includes(search));
    }
  };

  const filterPriceGoods = (goods, price) => {
    switch (price) {
      case "all":
        return goods;
      case "80к":
        return goods.filter((product) => product.price < 80000);
      case "100к":
        return goods.filter((product) => product.price < 100000);
      default:
        break;
    }
  };

  const filterTypeGoods = (goods, type) => {
    switch (type) {
      case "all":
        return goods.map((product) => {
          return (
            <CSSTransition
              key={product.id}
              timeout={1000}
              classNames="good__anim"
            >
              <Product key={product.id} product={product} />
            </CSSTransition>
          );
        });
      case "phone":
        return goods
          .filter((product) => product.type === "phone")
          .map((product) => {
            return (
              <CSSTransition
                key={product.id}
                timeout={1000}
                classNames="good__anim"
              >
                <Product key={product.id} product={product} />
              </CSSTransition>
            );
          });
      case "tablet":
        return goods
          .filter((product) => product.type === "tablet")
          .map((product) => {
            return (
              <CSSTransition
                key={product.id}
                timeout={1000}
                classNames="good__anim"
              >
                <Product key={product.id} product={product} />
              </CSSTransition>
            );
          });
      case "laptop":
        return goods
          .filter((product) => product.type === "laptop")
          .map((product) => {
            return (
              <CSSTransition
                key={product.id}
                timeout={1000}
                classNames="good__anim"
              >
                <Product key={product.id} product={product} />
              </CSSTransition>
            );
          });
      default:
        break;
    }
  };

  const renderComponents = (goods, price, type, search) => {
    if (goods.lenght === 0) {
      return <Spinner />;
    } else {
      let goodsfilterSearch = filterSearchGoods(goods, search);
      let goodsfilterPrice = filterPriceGoods(goodsfilterSearch, price);
      return filterTypeGoods(goodsfilterPrice, type);
    }
  };

  return (
    <TransitionGroup className="goods__items">
      {renderComponents(goods, filterPrice, filterType, filterSearch)}
    </TransitionGroup>
  );
};

const Product = (props) => {
  const { id, src, name, price, sale } = props.product;

  const { deleteData } = useHttp();

  const { dispatch, setIdProduct } = useContext(GoodsContext);

  const onDeleteProduct = (id) => {
    deleteData("http://localhost:3001/goods/" + id)
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(loading());
      });
  };

  return (
    <div className="goods__item">
      <div className="goods__product">
        <img src={src} alt={name} />
      </div>
      <NavLink
        to={`/product/${id}`}
        end
        className={() => "goods__name"}
        onClick={() => setIdProduct(id)}
      >
        {name}
      </NavLink>
      <div className="goods__price">{price} руб</div>
      <div className="goods__sale">Скидка: {sale} %</div>
      <div className="goods__delete" onClick={() => onDeleteProduct(id)}>
        &#9746;
      </div>
    </div>
  );
};

export default ListGoods;
