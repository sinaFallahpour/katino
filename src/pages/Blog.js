import React, { Component } from "react";
import { Post } from "../components/blog";
import * as service from "../components/blog";
import ADDRESS from "../ADDRESS";

export class Blog extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    service.getBlogs().then((res) => this.setState({ posts: res.data.resul }));
  }

  render() {
    return (
      <section className="blog-page container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="row">
          <aside className="col-12 col-lg-8 mx-auto">
            {this.state.posts.map((item, index) => (
              <div
                key={index}
                className={index === this.state.posts.length ? "mb-0" : "smb-2"}
              >
                <Post
                  id={item.id}
                  pic={
                    item.uploadPic !== null
                      ? `${ADDRESS}img/blog/${item.uploadPic}`
                      : "/img/sample-logo.svg"
                  }
                  title={item.title}
                  desc={item.content}
                  date={item.updateDate}
                />
              </div>
            ))}
          </aside>
        </div>
      </section>
    );
  }
}