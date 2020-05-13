import React, { Component } from "react";
import { Consumer } from "../AppContext";

export default class TopBar extends Component {
  render() {
    return (
      <div className="border">
        <Consumer>{ctx => <div>{ctx.user.name}</div>}</Consumer>
      </div>
    );
  }
}
