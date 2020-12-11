import React, { Component } from "react"
import { Header, Fields } from "../../components/createAd"

export class CreateAd extends Component {
  state = {}

  render() {
    return (
      <section className="container-fluid create-ad spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-10 mx-auto">
            <div className="bg-white srounded-md sp-2 smb-2">
              <Header />
              <Fields prop={this.props} />
            </div>
          </aside>
        </div>
      </section>
    )
  }
}
