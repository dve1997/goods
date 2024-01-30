import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { useHttp } from "../../hooks/http.hook";
import { GoodsContext } from "../../App";
import { loading } from "../../actions/actions";

import "./createProduct.scss";

const CreateProduct = () => {
  const [anim, setAnim] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  const { postData } = useHttp();

  const { dispatch } = useContext(GoodsContext);

  const initialDataForm = {
    id: uuidv4(),
    src: "",
    name: "",
    description: "",
    type: "",
    price: "",
  };
  const [dataForm, setDataForm] = useState(initialDataForm);

  const onChangeData = (e) => {
    const name = e.target.getAttribute("name");
    switch (name) {
      case "createsrc":
        setDataForm((state) => ({
          ...state,
          src: e.target.value,
        }));
        break;
      case "createname":
        setDataForm((state) => ({
          ...state,
          name: e.target.value,
        }));
        break;
      case "createdescription":
        setDataForm((state) => ({
          ...state,
          description: e.target.value,
        }));
        break;
      case "createtype":
        setDataForm((state) => ({
          ...state,
          type: e.target.value,
        }));
        break;
      case "createprice":
        setDataForm((state) => ({
          ...state,
          price: e.target.value,
        }));
        break;
      default:
        break;
    }
  };

  const onCreatePoduct = (dataForm) => {
    const data = JSON.stringify(dataForm);

    postData("http://localhost:3001/goods", "POST", data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => {
        setDataForm(initialDataForm);
        dispatch(loading());
      });
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={anim}
      timeout={1000}
      classNames="good__anim"
    >
      <div className="goods__createbox" ref={nodeRef}>
        <h3>Создание карточки товара</h3>
        <form>
          <div className="goods__createimg">
            <p>Изображение</p>
            <input
              type="text"
              name="createsrc"
              id="createsrc"
              placeholder="Вставте ссылку изображения товара..."
              onChange={(e) => onChangeData(e)}
              value={dataForm.src}
            />
          </div>
          <div className="goods__createname">
            <p>Наименование</p>
            <input
              type="text"
              name="createname"
              id="createname"
              placeholder="Введите наименование товара..."
              onChange={(e) => onChangeData(e)}
              value={dataForm.name}
            />
          </div>
          <div className="goods__createdescription">
            <p>Описание</p>
            <textarea
              name="createdescription"
              id="createdescription"
              placeholder="Введите описание товара..."
              onChange={(e) => onChangeData(e)}
              value={dataForm.description}
            ></textarea>
          </div>
          <div className="goods__createtype">
            <p>Тип</p>
            <select
              name="createtype"
              onChange={(e) => onChangeData(e)}
              value={dataForm.type}
            >
              <option>Выберите тип товара</option>
              <option value="phone">телефон</option>
              <option value="tablet">планшет</option>
              <option value="laptop">ноутбук</option>
            </select>
          </div>
          <div className="goods__createprice">
            <p>Цена</p>
            <input
              type="text"
              name="createprice"
              id="createprice"
              onChange={(e) => onChangeData(e)}
              value={dataForm.price}
            />
          </div>
        </form>
        <div className="goods__btns goods__btns_marginright">
          <NavLink to="/">
            <button className="goods__btn goods__btn_upwidth">
              Вернуться к списку товаров
            </button>
          </NavLink>
          <button
            className="goods__btn goods__btn_upwidth"
            onClick={() => onCreatePoduct(dataForm)}
          >
            Создать
          </button>
          <NavLink to="/">
            <button
              className="goods__btn goods__btn_upwidth"
              onClick={() => onCreatePoduct(dataForm)}
            >
              Создать и вернуться к списку товаров
            </button>
          </NavLink>
        </div>
      </div>
    </CSSTransition>
  );
};

export default CreateProduct;
