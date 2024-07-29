import logo from "./logo.svg";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import ScrollToTop from "./components/scrollToTop";
import { MembersDetail } from "./pages/MembersDetail/MembersDetail";
import { Registration } from "./pages/Registration/Registration";
import { Home } from "./pages/Home/Home";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { MainNews } from "./pages/NewsPage/MainNews/MainNews";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";
import { DisplayedSchool } from "./pages/SchoolManagement/DisplayedSchool";
import MySchoolLayout from "./pages/MySchoolLayout/MySchoolLayout";
import { AddSch } from "./pages/AddSch/AddSch";
import ZoneLayout from "./pages/ZoneLayout/ZoneLayout";
import LGALayout from "./pages/LGALayout/LGALayout";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="login" element={<Login />} />{" "}
        <Route path="Add-sch" element={<AddSch />} />{" "}
        <Route path="members-detail" element={<MembersDetail />} />{" "}
        <Route path="registration" element={<Registration />} />{" "}
        <Route path="news-page" element={<NewsPage />} />
        <Route path="main-news/:blog_id" element={<MainNews />} />
        <Route path="dashboard-layout/*" element={<DashboardLayout />} />{" "}
        <Route path="my-school-layout/*" element={<MySchoolLayout />} />{" "}
        <Route path="zone-layout/*" element={<ZoneLayout />} />{" "}
        <Route path="lga-layout/*" element={<LGALayout />} />{" "}
        {/* <Route path="displayed-school/:blog_id" element={<DisplayedSchool />} />{" "} */}
      </Routes>
    </>
  );
}

export default App;
