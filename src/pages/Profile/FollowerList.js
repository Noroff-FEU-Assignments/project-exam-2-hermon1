import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import FollowerList from "../../components/profile/Followers";
import AuthContext from "../../context/AuthContext";


export default function Followers(){
    const [auth, setAuth] = useContext(AuthContext);
    const { name } = useParams();
  
    if (auth === null) {
      return <Navigate replace to="/" />;
    }
    return <FollowerList name={name}/>
  }