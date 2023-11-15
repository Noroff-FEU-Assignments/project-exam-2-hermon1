import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserList from "../../components/users/UserList";
import AuthContext from "../../context/AuthContext";


export default function UserProfiles() {
    const [auth] = useContext(AuthContext);
    if (auth === null) {
      return <Navigate replace to="/" />;
    }
  
    return <UserList />;
  }
  