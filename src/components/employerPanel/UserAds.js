import React from "react"
import { AdStatus } from "./AdStatus"

export function UserAds(props) {
  return props.ads ? (
    props.ads.map((item, index) => {
      return (
        <div key={index} className="col-12 smb-2">
          <AdStatus
            id={item.id}
            title={item.title}
            adverCreatationStatus={item.adverCreatationStatus}
            adverStatus={item.adverStatus}
            asignStatusWithCounts={item.asignStatusWithCounts}
            adminDescription={item.adminDescription}
          />
        </div>
      )
    })
  ) : (
    <span className="ir-r fs-l text-center c-regular d-block">
      آگهی ای درج نکرده اید
    </span>
  )
}
