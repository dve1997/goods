import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";

import "./headerGoods.scss";
import logo from "../../assets/dve.jpg";

const HeaderGoods = () => {
  const [anim, setAnim] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={anim}
      timeout={1000}
      classNames="good__anim"
    >
      <div className="goods__headerbox" ref={nodeRef}>
        <div className="goods__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="goods__links">
          <NavLink
            to="/"
            className={() => "goods__list"}
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "",
            })}
          >
            Список
          </NavLink>
          <span>/</span>
          <NavLink
            to="/create"
            className={() => "goods__create"}
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "",
            })}
          >
            Создание карточки товара
          </NavLink>
        </div>
      </div>
    </CSSTransition>
  );
};

export default HeaderGoods;
