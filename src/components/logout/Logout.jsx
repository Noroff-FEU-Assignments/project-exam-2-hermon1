import { useContext } from "react";
import { Nav } from "react-bootstrap"
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";



export default function Logout(){
    const [ setAuth] = useContext(AuthContext);
    function logoutUser(){
      setAuth(null);
      return <Navigate replace to="/" />;
    }
  
    return (
      <Nav.Link onClick={logoutUser}>logout</Nav.Link> 
    )
  }