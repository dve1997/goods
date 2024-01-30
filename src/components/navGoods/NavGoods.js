import { useContext, useState, useTransition, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { GoodsContext } from "../../App";
import { loading } from "../../actions/actions";

import "./navGoods.scss";

const NavGoods = () => {
  const [anim, setAnim] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  const { dispatch } = useContext(GoodsContext);

  const [price, setPrice] = useState("all");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");

  const [isPending, startTransition] = useTransition();

  const onChangePrice = (e) => {
    setPrice(e.target.getAttribute("data-price"));
    dispatch(loading(e.target.getAttribute("data-price"), type, search));
  };

  const onChangeType = (e) => {
    setType(e.target.getAttribute("data-type"));
    dispatch(loading(price, e.target.getAttribute("data-type"), search));
  };

  const onChangeSearch = (e) => {
    startTransition(() => setSearch(e.target.value));
    dispatch(loading(price, type, e.target.value));
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={anim}
      timeout={1000}
      classNames="good__anim"
    >
      <div className="goods__nav" ref={nodeRef}>
        <div className="goods__search">
          <p>Поиск товара</p>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Введите наименование товара..."
            onChange={(e) => onChangeSearch(e)}
            value={isPending ? "Loading..." : search}
          />
        </div>
        <div className="goods__filterprice">
          <p>Сортировка по цене товара</p>
          <div className="goods__btns">
            <button
              className="goods__btn"
              data-price="all"
              onClick={(e) => onChangePrice(e)}
            >
              все <br /> товары
            </button>
            <button
              className="goods__btn"
              data-price="80к"
              onClick={(e) => onChangePrice(e)}
            >
              меньше <br /> 80 000
            </button>
            <button
              className="goods__btn"
              data-price="100к"
              onClick={(e) => onChangePrice(e)}
            >
              меньше 100 000
            </button>
          </div>
        </div>
        <div className="goods__filtertype">
          <p>Сортировка по типу товара</p>
          <div className="goods__btns">
            <button
              className="goods__btn"
              data-type="all"
              onClick={(e) => onChangeType(e)}
            >
              все товары
            </button>
            <button
              className="goods__btn"
              data-type="phone"
              onClick={(e) => onChangeType(e)}
            >
              телефон
            </button>
            <button
              className="goods__btn"
              data-type="tablet"
              onClick={(e) => onChangeType(e)}
            >
              планшет
            </button>
            <button
              className="goods__btn"
              data-type="laptop"
              onClick={(e) => onChangeType(e)}
            >
              ноутбук
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default NavGoods;
