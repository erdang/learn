import React, { useState, useEffect } from "react";

export function FruitList({ fruit, setFruit }) {
  const delFruit = delIndex => {
    const tem = [...fruit];
    tem.splice(delIndex, 1);
    setFruit(tem);
  };
  return (
    <ul>
      {fruit.map((item, index) => {
        return (
          <li key={item} onClick={() => delFruit(index)}>
            {item}
          </li>
        );
      })}
    </ul>
  );
}
