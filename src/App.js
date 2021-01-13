import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LandingFooter, EmployerFooter, PageTitle } from "./components";
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
  EditAdver,
} from "./pages/employer";
import { EditProfileEmployer } from "./pages/employer/EditProfileEmployer";
import { EmployerNotification } from "./components/employerPanel/notification/notification";
import { EmployerSheba } from "./pages/employer/EmployerSheba/EmployerSheba";
import { ScrollToTop, Navbar } from "./components";
import { Plans } from "./pages/employer/Plans";
import { EmployeePlans } from "./pages/employee/Plans";
import { ToastContainer } from "react-toastify";
import { SuccessPayment } from "./components/payment/SuccessPayment";
import { EmployeeDashboard } from "./pages/employee";
import { Security } from "./core/Security";
import {
  Tickets,
  CreateTicket,
  CreateTicketEmployee,
  TicketDetail,
  EmployeeTickets,
  EmployeeTicketDetail,
} from "./pages/ticketing";

import { EmployeeSuccessPage } from "./pages/employee/EmployeePayment/SuccessPayment";
import { EmployeeFailurePage } from "./pages/employee/EmployeePayment/FailurePayment";
import { EmployerSuccessPage } from "./pages/employer/EmployerPayment/SuccessPayment";
import { EmployerFailurePage } from "./pages/employer/EmployerPayment/FailurePayment";
import { EmployerProfile } from "./pages/employer/EmployerProfile";
import { EmployerHistoryPayment } from "./pages/employer/HistoryPayment";
import { AboutUsPage } from "./pages/KatinoInfoPages/AboutUs";
import { ContactPage } from "./pages/KatinoInfoPages/Contact";
import { PolicyPage } from "./pages/KatinoInfoPages/Policy";
import { EmployerTraining } from "./pages/KatinoInfoPages/EmployerTraining";
import { MyRequestDetails } from "./pages/employee/MyRequest/MyRequestDetails";
import { MyPlansDetails } from "./pages/employer/MyPlansDetails";
import { FrequentQ } from "./pages/KatinoInfoPages/FrequentQ";

import { NotFoundPage } from "./components/notFoundPage/notFoundPage";
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

    return (
      <div className="App">
        <BrowserRouter>
          {/* <Navbar/> */}
          {/* 
          {this.state.userInfo === "Employer" ? (
            <Navbar />
          ) : this.state.userInfo === "Employee" ? (
            <Navbar />
          ) : (
            <Navbar />
          )} */}
          <Switch>
            <ScrollToTop>
              {/*employer success payment  */}
              <Route
                path="/employer/payment/success"
                exact
                render={(props) => {
                  return (
                    <PageTitle title="وضعیت پرداخت">
                      <EmployerSuccessPage />
                    </PageTitle>
                  );
                }}
              ></Route>
              {/*employer failure payment  */}
              <Route
                path="/employer/payment/failure"
                exact
                render={(props) => {
                  return (
                    <PageTitle title="وضعیت پرداخت">
                      <EmployerFailurePage />
                    </PageTitle>
                  );
                }}
              ></Route>

              {/*employee success payment  */}
              <Route
                path="/employee/payment/success"
                exact
                render={(props) => {
                  return (
                    <PageTitle title="وضعیت پرداخت">
                      <EmployeeSuccessPage />
                    </PageTitle>
                  );
                }}
              ></Route>
              {/*employee failure payment  */}
              <Route
                path="/employee/payment/failure"
                exact
                render={(props) => {
                  return (
                    <PageTitle title="وضعیت پرداخت">
                      <EmployeeFailurePage />
                    </PageTitle>
                  );
                }}
              ></Route>

              {/* <Navbar /> */}
              <Route
                path="/"
                exact
                render={(props) => {
                  return (
                    <PageTitle title="خانه">
                      <Navbar />
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
                      <Navbar />
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
                      <Navbar />
                      <Jobs {...props} />
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
                      <Navbar />
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
                    <Navbar />
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
                    <Navbar />
                    <Register {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/:role/:type/Verification"
                render={(props) => (
                  <PageTitle title="کد اعتبارسنجی">
                    <Navbar />
                    <Verification props={props} {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Employer/CompleteProfile"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="تکمیل پروفایل">
                      {/* <Navbar /> */}
                      <CompleteProfile props={props} {...props} />
                      {/* <LandingFooter /> */}
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/EditProfile"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="ویرایش پروفایل">
                      <Navbar />
                      <EditProfileEmployer props={props} {...props} />
                      <LandingFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/Notifications"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="مشاهده اعلان ها">
                      <Navbar />
                      <EmployerNotification props={props} {...props} />
                      <LandingFooter />
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
                        <Navbar />
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
                      <Navbar />
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
                      <Navbar />
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
                      <Navbar />
                      <CreateAd props={props} {...props} />
                      <EmployerFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/editAdver"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="ویرایش آگهی">
                      <Navbar />
                      <EditAdver props={props} {...props} />
                      <EmployerFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/Employer/History/Payment"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="تاریخچه حساب">
                      <Navbar />
                      <EmployerHistoryPayment props={props} {...props} />
                      <EmployerFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/Employer/MyPlansDetails"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="تاریخچه حساب">
                      <Navbar />
                      <MyPlansDetails props={props} {...props} />
                      <EmployerFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/registersheba"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="ثبت شماره شبا">
                      <Navbar />
                      <EmployerSheba props={props} {...props} />
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
                      <Navbar />
                      <SuccessPayment {...props} />
                      <EmployerFooter />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/JobDetails/:id"
                render={(props) => {
                  if (this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <PageTitle title="مشاهده آگهی">
                      <Navbar />
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
                      <Navbar />
                      <EmployeePlans {...props} />
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
                      <Navbar />
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
                    <Navbar />
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
                      <Navbar />
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
                    <Navbar />
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
                      <Navbar />
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
                    <Navbar />
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
                      <Navbar />
                      <EmployeeDashboard props={props} {...props} />
                      <LandingFooter />
                    </React.Fragment>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/Employee/Dashboard/Requests/:id"
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="جزئیات درخواست من">
                      <Navbar />
                      <MyRequestDetails props={props} {...props} />
                      <LandingFooter />
                    </PageTitle>
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
                      <Navbar />
                      <AdInfo props={props} {...props} />
                      <EmployerFooter className="d-none d-lg-block" />
                    </React.Fragment>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/AdInfo/:id/RequestDetails/:resumeId/:asignResomeId"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employer/Login" />;
                  return (
                    <React.Fragment>
                      <Navbar />
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
                    <Navbar />
                    <Blog props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/EmployerTraining"
                render={(props) => (
                  <PageTitle title="وبلاگ">
                    <Navbar />
                    <EmployerTraining props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/FrequentQuestion"
                render={(props) => (
                  <PageTitle title="وبلاگ">
                    <Navbar />
                    <FrequentQ props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </PageTitle>
                )}
              ></Route>

              <Route
                path="/Blog/Post/:id"
                render={(props) => (
                  <React.Fragment>
                    <Navbar />
                    <Post props={props} {...props} />
                    <LandingFooter className="d-none d-lg-block" />
                  </React.Fragment>
                )}
              ></Route>

              <Route
                exact
                path="/Tickets"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="تیکت های پشتیبانی">
                      <Navbar />
                      <Tickets props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Tickets/:id"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="تیکت های پشتیبانی">
                      <Navbar />
                      <TicketDetail props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/Employee/Tickets"
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="تیکت های پشتیبانی">
                      <Navbar />
                      <EmployeeTickets props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employee/Tickets/:id"
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="تیکت های پشتیبانی">
                      <Navbar />
                      <EmployeeTicketDetail props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employee/createTicket"
                render={(props) => {
                  if (!this.isEmployee())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="ایجاد تیکت">
                      <Navbar />
                      <CreateTicketEmployee props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/Employer/Profile"
                render={(props) => {
                  if (!this.isEmployer())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="پروفایل کارفرما">
                      <Navbar />
                      <EmployerProfile props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                path="/createTicket"
                render={(props) => {
                  if (!this.isLogedIn())
                    return <Redirect exact to="/Employee/Login" />;
                  return (
                    <PageTitle title="ایجاد تیکت">
                      <Navbar />
                      <CreateTicket props={props} {...props} />
                      <LandingFooter className="d-none d-lg-block" />
                    </PageTitle>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/Policy"
                render={(props) => (
                  <PageTitle title="قوانین کاتینو">
                    <Navbar />
                    <PolicyPage props={props} {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/Contact"
                render={(props) => (
                  <PageTitle title="تماس با کاتینو">
                    <Navbar />
                    <ContactPage props={props} {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route
                exact
                path="/AboutUS"
                render={(props) => (
                  <PageTitle title="درباره کاتینو">
                    <Navbar />
                    <AboutUsPage props={props} {...props} />
                    <LandingFooter />
                  </PageTitle>
                )}
              ></Route>

              <Route path="/Security/:username/:key/:role">
                <Security />
              </Route>

              {/* 
              <Route
                path="/notfound"
                render={(props) => {
                  return (
                    <PageTitle title="">
                      <NotFoundPage props={props} />
                    </PageTitle>
                  )
                }}
              ></Route> */}

              {/* <Route exact component={NotFoundPage} /> */}
              {/* <Redirect exact to="/notfound" /> */}
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
