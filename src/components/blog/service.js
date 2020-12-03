import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";

export function getBlogs() {
  return axios.get(API_ADDRESS + "Blogs/GetAllBlogForIndex");
}

export function getContent(id) {
  return axios.get(API_ADDRESS + `Blogs/GetblogById?id=${id}`);
}
