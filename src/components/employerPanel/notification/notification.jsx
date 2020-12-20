import React, { useEffect, useState } from "react";
import { MiniSpinner } from "../../spinner/MiniSpinner";
import axios from "axios";
import { toast } from "react-toastify";
import API_ADDRESS from "../../../API_ADDRESS";
import { adverCreatationStatus } from "../../../enums/adverCreatationStatus";
import {
  NotifContainre,
  NotifIcon,
  NotifContext,
  Title,
  Description,
  Status,
} from "./notification.styles";

const EmployerNotification = () => {
  const [dataList, setDataList] = useState([]);
  const [dataListCount, setDataListCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        API_ADDRESS + `Adver/GetAllAdverNotificationForUser`,
        {},
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data.resul);
        setDataList(data.resul.advernotifs);
        setDataListCount(data.resul.notificationCount);
        setLoading(false);
      })
      .catch((err) => {
        err?.response?.data?.message.map((e) => {
          toast.error(e);
        });

        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <MiniSpinner />}
      <section className="tickets container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="row">
          <aside className="col-12">
            <div className=" sbs-shadow srounded-md sp-2">
              {dataList.length !== 0 ? (
                dataList.map((item) => (
                  <NotifContainre key={item.id}>
                    <NotifIcon>
                      <i
                        class="fa fa-bell fa-1.5x c-primary"
                        aria-hidden="true"
                      ></i>
                    </NotifIcon>
                    <NotifContext>
                      <Title>{item.title}</Title>
                      <Description>
                        {" "}
                        توضیحات : {item.adminDescription}
                      </Description>
                      <Status>
                        وضعیت :{" "}
                        {adverCreatationStatus(item.adverCreatationStatus)}
                      </Status>
                    </NotifContext>
                  </NotifContainre>
                ))
              ) : (
                <span className="ir-r fs-s c-regular text-center d-block">
                  اعلانی برای نمایش وجود ندارد.
                </span>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export { EmployerNotification };
