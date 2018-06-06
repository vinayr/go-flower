import React, { Component } from "react";

export default class User extends Component {
  render() {
    const { id } = this.props.match.params;
    console.log("id", id);

    return (
      <div>
        <p>1</p>
        <p>111@abc.xyz</p>
      </div>
    );
  }
}
