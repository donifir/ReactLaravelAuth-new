import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, formData).then((res) => {
        if (res.data.status === 200) {
            // localStorage.setItem('Name', 'Rahul');
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          console.log(res.data);
          navigate("/");
        } else if (res.data.status === 401) {
          console.log("Warning password salah");
        } else {
          setValidationError(res.data.validation_errors);
        }
      });
    });
  };

  return (
    <Container className="pt-4">
        <NavbarComponent/>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Card>
            <Card.Header>
              <h3>Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={loginSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <span className="text-danger">{validationError.email}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <span className="text-danger">
                    {validationError.password}
                  </span>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
