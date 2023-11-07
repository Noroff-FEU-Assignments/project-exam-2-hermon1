import axios from "axios";
import { useState, useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BASE_URL, REGISTER_PATH } from "../../constants/api";
import { MdOutlineAlternateEmail } from "react-icons/md"
import { FaUserAlt } from 'react-icons/fa';
import { BiLockAlt } from 'react-icons/bi'
import FormError from "../Common/FormError";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


export default function RegisterUserForm() {
    const [loginError, setLoginError] = useState(null);
    const [auth, setAuth] = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate();
    if (auth) {
      navigate('/dashboard')
    }
  



const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = BASE_URL + REGISTER_PATH

  async function onSubmit(data) {
    setLoginError(null);
    try {
      await axios.post(url, data);
      setSuccessMessage(`<p className="success">You ar now logging in!</p>`)
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    catch (error) {
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
                <InputGroup.Text id="basic-addon1"><FaUserAlt /></InputGroup.Text>
                <Form.Control
                  {...register("name", { required: true, minLength: 5, pattern: /^[a-zA-z0-9_]+$/ })}
                  type="text"
                  placeholder="Enter name..."
                />
              </div>
              {errors.name && <span className="error">This field is required. The message must be at least 5 characters</span>}
            </InputGroup>
            <Form.Label></Form.Label>
            <InputGroup className="mb-3">
              <div className="input_group-container">
                <InputGroup.Text id="basic-addon1"><MdOutlineAlternateEmail /></InputGroup.Text>
                <Form.Control
                  // {...register("email")}
                  {...register("email", { required: true, minLength: 3, pattern: /^[A-Za-z0-9._%+-]+@(stud\.noroff|noroff)\.no$/ })}
                  type="email"
                  placeholder="Enter email..."

                />
              </div>
              <div className="message_container">
              </div>
              {errors.email && <span className="error">Please enter a valid email address <br />The email most be a @stud.noroff.no or noroff.no</span>}
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

            <Form.Label>Avatar</Form.Label>
            <InputGroup className="mb-3">
              <div className="input_group-container">
                <input name="avatar"
                  {...register("avatar")}
                  type="url"
                />
              </div>
            </InputGroup>

            <Form.Label>Banner</Form.Label>
            <InputGroup className="mb-3">
              <div className="input_group-container">
                <input className="url_input" name="banner"
                  {...register("banner")}
                  type="url"
                />
              </div>
            </InputGroup>
          </Form.Group>
          <div className="message">{successMessage}</div>
          <div className="message">{loginError}</div>
          <Button className="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </>
  )
}