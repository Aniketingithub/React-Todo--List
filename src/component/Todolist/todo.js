import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const list = localStorage.getItem("TODO-LIST");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setinputData] = useState("");
  const [items, setItems] = useState(getLocalData);
  const [editItem, setEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("plz fill");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((ele) => {
          if (ele.id === editItem) {
            return { ...ele, name: inputData };
          }
          return ele;
        })
      );
      setinputData([]);
      setEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setinputData("");
    }
  };

  const EditItem = (idx) => {
    const itemtodoedit = items.find((ele) => {
      return ele.id === idx;
    });
    setinputData(itemtodoedit.name);
    setEditItem(idx);
    setToggleButton(true);
  };

  const deleteItem = (idx) => {
    const updatedItems = items.filter((ele) => {
      return ele.id !== idx;
    });
    setItems(updatedItems);
  };

  const removeall = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("TODO-LIST", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoLogo" />
            <figcaption>Add Your List</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add on"
              className="form-control"
              value={inputData}
              onChange={(event) => setinputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((ele) => {
              return (
                <div className="eachItem" key={ele.id}>
                  <h3>{ele.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => EditItem(ele.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(ele.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeall}
            >
              <span>CHECK-LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
