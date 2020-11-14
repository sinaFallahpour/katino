import { useEffect } from "react";

export const PageTitle = (props) => {
  useEffect(() => {
    document.title = "کاتینو | " + props.title;
  }, [props.title]);

  return props.children;
};
