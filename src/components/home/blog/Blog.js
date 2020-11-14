import React from "react";
import { Post } from "./Post";
import { Link } from "react-router-dom";

let blog = [
  {
    id: "1",
    title: "5 نکته طلایی برای یافتن شغل رویاییتان",
    pic: "./img/index-blog/01.png",
    date: "15 شهریور 99",
  },
  {
    id: "2",
    title: "6 نکته طلایی برای یافتن شغل رویاییتان",
    pic: "./img/index-blog/02.png",
    date: "16 شهریور 99",
  },
  {
    id: "3",
    title: "7 نکته طلایی برای یافتن شغل رویاییتان",
    pic: "./img/index-blog/03.png",
    date: "17 شهریور 99",
  },
];

export function Blog() {
  return (
    <section className="blog container-fluid spx-2 spx-lg-10 d-none d-lg-block">
      <header className="d-flex justify-content-between align-items-center smb-2">
        <h2 className="fs-l ir-b c-dark spl-1">وبلاگ</h2>
        <hr className="w-100" />
        <Link
          className="ir-r fs-l c-regular spr-1"
          style={{ width: "7.09em" }}
          to="/"
        >
          مشاهده بیشتر
        </Link>
      </header>

      <div className="row">
        {blog.map((item) => (
          <div key={item.id} className="col-12 col-lg-4 smb-2 mb-lg-0">
            <Post title={item.title} pic={item.pic} date={item.date} />
          </div>
        ))}
      </div>
    </section>
  );
}
