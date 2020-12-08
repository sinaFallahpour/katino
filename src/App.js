import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {
  LandingNavbar,
  EmployerNavbar,
  EmployeeNavbar,
  LandingFooter,
  EmployerFooter,
  PageTitle,
} from "./components";
import {
  NotFound,
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
  Blog,
  Post,
} from "./pages";
import {
  CompleteProfile,
  CreateAd,
  Dashboard,
  AdInfo,
  RequestDetails,
} from "./pages/employer";
import { ScrollToTop, Navbar } from "./components";
import { Plans } from "./pages/employer/Plans";
import { ToastContainer } from "react-toastify";
import { SuccessPayment } from "./components/payment/SuccessPayment";
import { EmployeeDashboard } from "./pages/employee";
import { Security } from "./core/Security";
import { Tickets, Detail, CreateTicket } from "./pages/ticketing";
import { history } from "../src/core/agent";
class App extends Component {
  state = {
    loading: true,
    userInfo: "",
  };
  async getUserInfo() {
    const userInfo = localStorage.getItem("userInfo");
    this.setState({ userInfo });
  }
  async componentDidMount() {
    const userInfo = localStorage.getItem("userInfo");
    await this.setState({ userInfo, loading: false });
  }
  componentWillUnmount() {
    this.getUserInfo();
  }

  isEmployer = () => {
    const { userInfo } = this.state;
    if (!userInfo) return false;
    if (userInfo != "Employer") return false;
    return true;
  };

  isEmployee = () => {
    const { userInfo } = this.state;
    if (!userInfo) return false;
    if (userInfo != "Employee") return false;
    return true;
  };

  isLogedIn = () => {
    const { userInfo } = this.state;
    if (!userInfo) return false;
    return true;
  };

  render() {
    if (this.state.loading) {
      return <>loading..</>;
    }

    console.log(this.state.userInfo);
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
                render={(props) => {
                  return (
                    <PageTitle title="خانه">
                      <LandingNavbar />
                      <Home {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employee/Home"
                exact
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="خانه">
                      <EmployeeNavbar />
                      <Home {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Jobs"
                render={(props) => {
                  return (
                    <PageTitle title="جستجوی مشاغل">
                      <LandingNavbar />
                      <Jobs {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
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

              {/* 
              <Route
                path="/Employer/CompleteProfile"
                exact
                render={(props) => {
                  if (!this.isEmployee())
                    return history.push("/Employer/Login");
                  return (
                    <PageTitle title="تکمیل پروفایل">
                      <CompleteProfile props={props} {...props} />
                    </PageTitle>
                  );
                }}
              ></Route> */}

              <Route
                path="/Employer/CompleteProfile"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="تکمیل پروفایل">
                      {/* <LandingNavbar /> */}
                      <CompleteProfile props={props} {...props} />
                      {/* <LandingFooter /> */}
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/Dashboard/Plans/:id/Payment"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  else
                    return (
                      <PageTitle title="پرداخت">
                        <EmployerNavbar />
                        <Payment props={props} {...props} />
                        <EmployerFooter className="d-none d-lg-block" />
                      </PageTitle>
                    );
                }}
              ></Route>

              <Route
                path="/Employer/Dashboard"
                exact
                render={(props) => {
                  if (!this.isEmployer()) {
                    return <Redirect exact to="/Employer/Login" />;
                  }
                  return (
                    <PageTitle title="داشبورد">
                      <EmployerNavbar />
                      <Dashboard {...props} />
                      <EmployerFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/Dashboard/Plans"
                exact
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="تعرفه ها">
                      <EmployerNavbar />
                      <Plans {...props} />
                      <EmployerFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/CreateAd"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="درج آگهی">
                      <EmployerNavbar />
                      <CreateAd props={props} {...props} />
                      <EmployerFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/SuccessPayment"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="پرداخت با موفقیت انجام شد">
                      <EmployerNavbar />
                      <SuccessPayment {...props} />
                      <EmployerFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/JobDetails/:id"
                render={(props) => {
                  return (
                    <PageTitle title="مشاهده آگهی">
                      <LandingNavbar />
                      <JobDetails {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employee/Plans"
                exact
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="تعرفه ها">
                      <EmployeeNavbar />
                      <Plans {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employee/Jobs"
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="جستجوی مشاغل">
                      <EmployeeNavbar />
                      <Jobs {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employee/CreateResume"
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="ساخت رزومه">
                      <EmployeeNavbar />
                      <CreateResume {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
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
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="50 شرکت برتر">
                      <EmployeeNavbar />
                      <BestCompanies />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
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
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="بخش کارفرمایان">
                      <LandingNavbar />
                      <EmployerLanding />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
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
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <React.Fragment>
                      <EmployeeNavbar />
                      <EmployeeDashboard props={props} {...props} />
                      <LandingFooter />
                    </React.Fragment>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/Employer/AdInfo/:id"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <React.Fragment>
                      <EmployerNavbar />
                      <AdInfo props={props} {...props} />
                      <EmployerFooter className="d-none d-lg-block" />
                    </React.Fragment>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/AdInfo/:id/RequestDetails/:resumeId"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <React.Fragment>
                      <EmployerNavbar />
                      <RequestDetails props={props} {...props} />
                      <EmployerFooter className="d-none d-lg-block" />
                    </React.Fragment>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/Blog"
                render={(props) => (
                  <PageTitle title="وبلاگ">
                    <LandingNavbar />
                    <Blog props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Blog/Post/:id"
                render={(props) => (
                  <React.Fragment>
                    <LandingNavbar />
                    <Post props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </React.Fragment>
                )}
              ></Route>

              <Route
                exact
                path="/Tickets"
                render={(props) => (
                  <PageTitle title="تیکت های پشتیبانی">
                    <LandingNavbar />
                    <Tickets props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Tickets/:id"
                render={(props) => {
                  if (!this.isLogedIn())
                    return <Redirect exact to="/Employee/Login" />;
                  <PageTitle title="تیکت های پشتیبانی">
                    <LandingNavbar />
                    <Detail props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </PageTitle>;
                }}
              ></Route>

              <Route
                path="/createTicket"
                render={(props) => {
                  if (!this.isLogedIn())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="تیکت های پشتیبانی">
                      <LandingNavbar />
                      <CreateTicket props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route path="/Security/:username/:key/:role">
                <Security />
              </Route>
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
