import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserList from "../../components/users/UserList";
import AuthContext from "../../context/AuthContext";


export default function UserProfiles() {
    const [auth, setAuth] = useContext(AuthContext);
    if (auth === null) {
      return <Navigate replace to="/" />;
    }
  
    return <UserList />;
  }
  