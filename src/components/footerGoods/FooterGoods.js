import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";

import "./footerGoods.scss";

const FooterGoods = () => {
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
      <div className="goods__footerbox" ref={nodeRef}>
        <div className="goods__autor">DVE</div>
      </div>
    </CSSTransition>
  );
};

export default FooterGoods;
