import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";

export default function Registes() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();

  const postRegister = (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      // Login...
      axios.post(`/api/register`, formData).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);

          console.log(res);
          navigate("/login");
        } else {
          // console.log(res);
          setValidationError(res.data.validation_errors);
        }
      });
    });
  };

  return (
    <Container className="pt-4">
      <NavbarComponent />
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Card>
            <Card.Header>
              <h3>Register</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={postRegister}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <span className="text-danger">{validationError.name}</span>
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    value={confirm_password}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                  <span className="text-danger">
                    {validationError.confirm_password}
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
