import React, { useState, useEffect, useReducer } from "react";
import { FruitList } from "../components/FruitList";
import { FruitAdd } from "../components/FruitAdd";

function fruitReducer(state = [], action) {
  //console.log(state);
  switch (action.type) {
    case "init":
    case "replace":
      return [...action.payload];
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}

export function UseReducerPage(props) {
  const [fruit, dispatch] = useReducer(fruitReducer, ['aaa']);
  console.log("user", useReducer(fruitReducer, []));
  useEffect(() => {
    setTimeout(() => {
      //dispatch({ type: "init", payload: ["apple", "orange"] });
    }, 1000);
  }, []);
  return (
    <div>
      <h3>UseReducerPage</h3>
      <FruitList
        fruit={fruit}
        setFruit={(name)=>dispatch({ type: "replace", payload: name })}
      />
      <FruitAdd addFruit={name => dispatch({ type: "add", payload: name })} />
    </div>
  );
}
