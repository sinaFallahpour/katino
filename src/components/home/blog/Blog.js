import React from "react"
import { Post } from "./Post"
import ADDRESS from "../../../ADDRESS"
import { Link } from "react-router-dom"

export function Blog(props) {
  return (
    <section className="blog container-fluid spx-2 spx-lg-10 d-none d-block">
      <header className="d-flex justify-content-between align-items-center smb-2">
        <h2 className="fs-l ir-b c-dark spl-1">وبلاگ</h2>
        <hr className="w-100" />
        <Link
          style={{ fontSize: 16, width: 117 }}
          className="ir-r c-regular spr-1 text-right d-block"
          to="/Blog"
        >
          مشاهده بیشتر
        </Link>
      </header>

      <div className="row">
        {props.posts.map((item, index) => {
          if (index < 3) {
            return (
              <div key={item.id} className="col-12 col-lg-4 smb-2 mb-lg-0">
                <Post
                  title={item.title}
                  pic={
                    item.uploadPic !== null
                      ? `${ADDRESS}img/blog/${item.uploadPic}`
                      : "/img/sample-logo.svg"
                  }
                  date={item.updateDate}
                  id={item.id}
                />
              </div>
            )
          }
        })}
      </div>
    </section>
  )
}
