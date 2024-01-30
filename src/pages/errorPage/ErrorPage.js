import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";

import "./errorPage.scss";
import error from "../../assets/error.png";

const ErrorPage = () => {
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
      <div className="goods__error" ref={nodeRef}>
        <h3>Возникла ошибка, указанной странцы не существует.</h3>
        <img src={error} alt="error" />
      </div>
    </CSSTransition>
  );
};

export default ErrorPage;
