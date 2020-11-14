import React, { Component } from "react";

export class Description extends Component {
  render() {
    return (
      <div
        className="ad-description ir-r fs-m c-regular"
        dangerouslySetInnerHTML={{ __html: this.props.description }}
      >
        {}
      </div>
    );
  }
}
