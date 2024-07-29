import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./navbar.scss";
function NavBar() {
  return (
    <div className="col-md-10 offset-md-1 nav-container">
      <Navbar collapseOnSelect expand="lg" className="">
        <Container>
          <Navbar.Brand href="/" style={{ flexGrow: 10 }}>
            {" "}
            <img
              className="img"
              src={Logo}
              alt="Scholar"
              width="164px"
              height="57px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <NavDropdown title="About Us" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Link to={"school-finder"}>
                <button>School Finder</button>
              </Link>
              <Link to={"/news-page"}>
                <button>News & Events</button>
              </Link>
              <Link to={"/contact-us"}>
                <button>Contact Us</button>
              </Link>{" "}
              <Link to={"dashboard-layout/admin-dashboard"}>
                <button>Admin</button>
              </Link>{" "}
              <Link to={"my-school-layout/my-schools"}>
                <button>My Schools</button>
              </Link>{" "}
              <Link to={"zone-layout/zone-dashboard"}>
                <button>Zone</button>
              </Link>{" "}
              <Link to={"lga-layout/lga-dashboard"}>
                <button>LGA</button>
              </Link>{" "}
              <Link to={"/login"}>
                <button>Log In</button>
              </Link>
              <Link to={"/registration"}>
                <button className="app-btn">Register</button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
