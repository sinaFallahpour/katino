import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  LandingNavbar,
  EmployerNavbar,
  EmployeeNavbar,
  LandingFooter,
  EmployerFooter,
  PageTitle,
} from "./components";
import {
  Home,
  Login,
  Verification,
  Register,
  Jobs,
  Payment,
  JobDetails,
  CreateResume,
  AllCompanies,
  BestCompanies,
  EmployerLanding,
  CompanyDetails,
} from "./pages";
import { CompleteProfile, CreateAd, Dashboard } from "./pages/employer";
import { ScrollToTop, Navbar } from "./components";
import { Plans } from "./pages/employer/Plans";
import { ToastContainer } from "react-toastify";
import { SuccessPayment } from "./components/payment/SuccessPayment";
import { EmployeeDashboard } from "./pages/employee";

class App extends Component {
  state = { userInfo: "" };
  async getUserInfo() {
    const userInfo = localStorage.getItem("userInfo");
    this.setState({ userInfo });
  }
  componentDidMount() {
    const userInfo = localStorage.getItem("userInfo");
    this.setState({ userInfo });
  }
  componentWillUnmount() {
    this.getUserInfo();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {/* <Navbar/> */}
          {/* 
          {this.state.userInfo === "Employer" ? (
            <EmployerNavbar />
          ) : this.state.userInfo === "Employee" ? (
            <EmployeeNavbar />
          ) : (
            <LandingNavbar />
          )} */}
          <Switch>
            <ScrollToTop>
              {/* <Navbar /> */}
              <Route
                path="/"
                exact
                render={(props) => (
                  <PageTitle title="خانه">
                    <LandingNavbar />
                    <Home {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employee/Home"
                exact
                render={(props) => (
                  <PageTitle title="خانه">
                    <EmployeeNavbar />
                    <Home {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Jobs"
                render={(props) => (
                  <PageTitle title="جستجوی مشاغل">
                    <LandingNavbar />
                    <Jobs {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/:role/Login"
                render={(props) => (
                  <PageTitle title="ورود">
                    <LandingNavbar />
                    <Login {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/:role/Register"
                render={(props) => (
                  <PageTitle title="ثبت نام">
                    <LandingNavbar />
                    <Register {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/:role/:type/Verification"
                render={(props) => (
                  <PageTitle title="کد اعتبارسنجی">
                    <LandingNavbar />
                    <Verification props={props} {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employer/CompleteProfile"
                render={(props) => (
                  <PageTitle title="تکمیل پروفایل">
                    <LandingNavbar />
                    <CompleteProfile props={props} {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employer/Dashboard/Plans/:id/Payment"
                render={(props) => (
                  <PageTitle title="پرداخت">
                    <EmployerNavbar />
                    <Payment props={props} {...props} />
                    <EmployerFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employer/Dashboard"
                exact
                render={(props) => (
                  <PageTitle title="داشبورد">
                    <EmployerNavbar />
                    <Dashboard {...props} />
                    <EmployerFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employer/Dashboard/Plans"
                exact
                render={(props) => (
                  <PageTitle title="تعرفه ها">
                    <EmployerNavbar />
                    <Plans {...props} />
                    <EmployerFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employee/Jobs"
                render={(props) => (
                  <PageTitle title="جستجوی مشاغل">
                    <EmployeeNavbar />
                    <Jobs {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employer/CreateAd"
                render={(props) => (
                  <PageTitle title="درج آگهی">
                    <EmployerNavbar />
                    <CreateAd props={props} {...props} />
                    <EmployerFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employer/SuccessPayment"
                render={(props) => (
                  <PageTitle title="پرداخت با موفقیت انجام شد">
                    <EmployerNavbar />
                    <SuccessPayment {...props} />
                    <EmployerFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/JobDetails/:id"
                render={(props) => (
                  <PageTitle title="مشاهده آگهی">
                    <LandingNavbar />
                    <JobDetails {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employee/CreateResume"
                render={(props) => (
                  <PageTitle title="ساخت رزومه">
                    <EmployeeNavbar />
                    <CreateResume {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/BestCompanies"
                render={(props) => (
                  <PageTitle title="50 شرکت برتر">
                    <LandingNavbar />
                    <BestCompanies />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/Employee/BestCompanies"
                render={(props) => (
                  <PageTitle title="50 شرکت برتر">
                    <EmployeeNavbar />
                    <BestCompanies />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/AllCompanies"
                render={(props) => (
                  <PageTitle title="همه ی شرکت ها">
                    <LandingNavbar />
                    <AllCompanies />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/Employers"
                render={(props) => (
                  <PageTitle title="بخش کارفرمایان">
                    <LandingNavbar />
                    <EmployerLanding />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/Company/:enName"
                render={(props) => (
                  <React.Fragment>
                    <LandingNavbar />
                    <CompanyDetails props={props} {...props} />
                    <LandingFooter />
                  </React.Fragment>
                )}
              ></Route>

              <Route
                exact
                path="/Employee/Dashboard/:page"
                render={(props) => (
                  <React.Fragment>
                    <EmployeeNavbar />
                    <EmployeeDashboard props={props} {...props} />
                  </React.Fragment>
                )}
              ></Route>
            </ScrollToTop>
          </Switch>

          {/* <Footer/> */}
        </BrowserRouter>

        <div className="ir-r">
          <ToastContainer rtl={true} />
        </div>
      </div>
    );
  }
}

export default App;
