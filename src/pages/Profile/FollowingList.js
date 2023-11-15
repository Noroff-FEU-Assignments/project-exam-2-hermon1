import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import Following from "../../components/profile/Following";
import AuthContext from "../../context/AuthContext";


export default function FollowingList(){
    const [auth] = useContext(AuthContext);
    const { name } = useParams();
  
    if (auth === null) {
      return <Navigate replace to="/" />;
    }
    return <Following name={name} />
  }