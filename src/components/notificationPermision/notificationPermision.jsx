import React from "react";

const NotificationPermision = () => {
  const confirmNofit = () => {
    const options = {
      body: "frst notif of amo sam kabir would be the best programmer",
      icon: "/favicon/64x64.png",
      image: "/img/employer-landing-intro.png",
      dir: "rtl",
      lang: "fa-IR",
      vibrate: [100, 50, 200],
      batch: "/favicon/64x64.png",
      tag: "blog",
      renotift: false,
      actions: [
        { action: "confrim", title: "Confrim", icon: "/favicon/64x64.png" },
        { action: "cancel", title: "Cancel", icon: "/favicon/64x64.png" },
      ],
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((swreg) =>
        swreg.showNotification("first notif of amo sam from sw", options)
      );
    }
  };

  const checkNotif = () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      Notification.requestPermission(function (result) {
        console.log("User Choice", result);
        if (result !== "granted") {
          console.log("No notification permission granted!");
        } else {
          confirmNofit();
        }
      });
    }
  };

  return <div onClick={checkNotif}>notifi</div>;
};

export { NotificationPermision };
