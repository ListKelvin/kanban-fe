import React from "react";
import empty from "./empty.svg";
function EmptyBg() {
  return <img className="empty-img" alt="empty img" src={empty} />;
}

export function Bg(props) {
  const isEmpty = props.isEmpty;
  if (isEmpty) {
    return <EmptyBg />;
  }
}
