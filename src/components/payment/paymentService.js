import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";

// /LoadPlan

export const paymentService = {
  checkDiscount: (id, gift) => {
    axios.post(
      API_ADDRESS + "/paymentPlan",
      {
        planId: id,
        giftCardId: gift,
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("JWT")}`,
        },
      }
    );
  },
};
