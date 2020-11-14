import React, { Component } from "react";

export class Pagination extends Component {
  render() {
    return (
      <nav className="smt-3 w-50 mx-auto">
        <ul className="pagination bg-white srounded-md sshadow d-flex justify-content-center align-items-center sp-1">
          <li className="page-item">
            <a
              className="page-link shadow-none spx-2 border-0 ir-r c-grey"
              href="#"
            >
              <i className="fas fa-chevron-right"></i>
            </a>
          </li>

          <li className="page-item">
            <a
              className="page-link shadow-none sp-1 border-0 ir-r c-grey"
              href="#"
            >
              1
            </a>
          </li>

          <li className="page-item">
            <a
              className="page-link shadow-none sp-1 border-0 ir-r c-grey"
              href="#"
            >
              2
            </a>
          </li>

          <li className="page-item">
            <a
              className="page-link shadow-none sp-1 border-0 ir-r c-grey"
              href="#"
            >
              3
            </a>
          </li>

          <li className="page-item">
            <a className="page-link shadow-none spx-2 border-0 c-grey" href="#">
              <i className="fas fa-chevron-left"></i>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
