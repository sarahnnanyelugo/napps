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

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="login" element={<Login />} />{" "}
        <Route path="members-detail" element={<MembersDetail />} />{" "}
        <Route path="registration" element={<Registration />} />{" "}
        <Route path="news-page" element={<NewsPage />} />
        <Route path="main-news/:blog_id" element={<MainNews />} />
      </Routes>
    </>
  );
}

export default App;
