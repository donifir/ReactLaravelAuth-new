import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/logout`).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        // localStorage.clear();
        navigate('/');
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        console.log(res.data.message);
        // Swal.fire({
        //   icon: "success",
        //   text: res.data.message,
        // });
      }
    });
  };
  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <>
        <Link className="nav-link" to="/register">
          Register
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </>
    );
  } else {
    AuthButton = <Nav.Link onClick={logoutSubmit}>Logout</Nav.Link>;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {AuthButton}

            {/* <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Nav.Link onClick={logoutSubmit} >Logout</Nav.Link> */}

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
