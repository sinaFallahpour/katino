import React, { Component } from "react";
import * as service from "../components/blog";
import { PageTitle } from "../components/PageTitle";
import ADDRESS from "../ADDRESS";

export class Post extends Component {
  state = {
    details: {},
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    await service.getContent(id).then((res) => {
      this.setState({ details: res.data.resul });
    });
  }

  render() {
    return (
      <PageTitle title={this.state.details.title}>
        <section className="post-blog container-fluid smt-10 spt-3 spx-2 spx-lg-10">
          <div className="row">
            <aside className="col-12">
              <div className="content bg-white sbs-shadow srounded-md sp-2">
                <header className="row p-0 m-0 d-flex justify-content-between align-items-center">
                  <div className="col-3 col-lg-2 p-0 m-0">
                    <img
                      className="d-block w-100"
                      src={
                        this.state.details.uploadPic !== null
                          ? `${ADDRESS}img/blog/${this.state.details.uploadPic}`
                          : "/img/sample-logo.svg"
                      }
                    />
                  </div>

                  <div className="col-9 col-lg-10 p-0 m-0 pr-3">
                    <h2 className="d-block ir-b text-right fs-m c-dark smb-1">
                      {this.state.details.title}
                    </h2>
                    <span className="d-block ir-r text-justify fs-s c-regular mb-0">
                      {this.state.details.updateDate}
                    </span>
                  </div>
                </header>

                <hr className="smy-3" />

                <div
                  className="ir-r"
                  dangerouslySetInnerHTML={{
                    __html: this.state.details.content,
                  }}
                ></div>
              </div>
            </aside>
          </div>
        </section>
      </PageTitle>
    );
  }
}
