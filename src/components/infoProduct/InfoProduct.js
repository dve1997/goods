import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect, useContext } from "react";

import { GoodsContext } from "../../App";
import { useHttp } from "../../hooks/http.hook";

import "./infoProduct.scss";

const InfoProduct = () => {
  const [anim, setAnim] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  const { getData } = useHttp();

  const { idProduct } = useContext(GoodsContext);

  const [product, setProduct] = useState({});
  const { src, name, description, type, price, sale } = product;

  useEffect(() => {
    getData("http://localhost:3001/goods/" + idProduct)
      .then((data) => setProduct(data))
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  }, []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={anim}
      timeout={1000}
      classNames="good__anim"
    >
      <div className="goods__productbox" ref={nodeRef}>
        <div className="goods__infoimg">
          <img src={src} alt={name} />
        </div>
        <div className="goods__info">
          <h3>Описание товара</h3>
          <div className="goods__infoname">
            <p className="goods__title">Наименование</p>
            <p className="goods__inf">{name}</p>
          </div>
          <div className="goods__infodescription">
            <p className="goods__title">Описание</p>
            <p className="goods__inf">{description}й</p>
          </div>
          <div className="goods__infotype">
            <p className="goods__title">Тип</p>
            <p className="goods__inf">{type}</p>
          </div>
          <div className="goods__infoprice">
            <p className="goods__title">Цена</p>
            <p className="goods__inf">{price} руб</p>
          </div>
          <div className="goods__infosale">
            <p className="goods__title">Скидка</p>
            <p className="goods__inf">{sale} %</p>
          </div>
          <NavLink to="/">
            <button className="goods__btn goods__btn_upwidth">
              Вернуться к списку товаров
            </button>
          </NavLink>
        </div>
      </div>
    </CSSTransition>
  );
};

export default InfoProduct;
