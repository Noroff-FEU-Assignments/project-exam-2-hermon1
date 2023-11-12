import axios from "axios";
import { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { MdOutlineAlternateEmail } from "react-icons/md"
import { BiLockAlt } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const url = BASE_URL + TOKEN_PATH;
    const [loginError, setLoginError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      async function onSubmit(data) {
        try {
          const response = await axios.post(url, data);
          setAuth(response.data);
          if (response.status === 200) {
            setSuccessMessage(`<div className="success"><p>You ar now logging in!</p></div>`)
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          }
        } catch (error) {
          const errorMessage = <div className="error">{error.response.data.errors[0].message}</div>;
          setLoginError(errorMessage);
    
        }
      }

      return (
        <>
          <div>
            <Form className="form_container" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" >
                <Form.Label></Form.Label>
    
                <InputGroup className="mb-3">
                  <div className="input_group-container">
                    <InputGroup.Text id="basic-addon1"><MdOutlineAlternateEmail /></InputGroup.Text>
                    <Form.Control
                      {...register("email", { required: true, minLength: 3, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                      type="email"
                      placeholder="Enter email..."
                    />
                  </div>
                  {errors.email && <span className="error">Please enter a valid email address</span>}
    
                </InputGroup>
    
                <Form.Label htmlFor="basic-url"></Form.Label>
                <InputGroup className="mb-3">
                  <div className="input_group-container">
    
                    <InputGroup.Text><BiLockAlt /></InputGroup.Text>
                    <Form.Control
                      name="password"
                      {...register("password", { required: true, minLength: 8 })}
                      type="password"
                      placeholder="Password..."
                    />
                  </div>
                  {errors.password && <span className="error">The message must be at least 8 characters</span>}
                </InputGroup>
              </Form.Group>
    
              <Button className="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
          <div className="message">{successMessage}</div>
          <div className="message">{loginError}</div>
          <div className="register_link-container">
            <p>If you don't have a user. You can register <a href="/register">Here!</a></p>
          </div>
        </>
      );
    }