import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import FollowerList from "../../components/profile/Followers";
import Following from "../../components/profile/Following";
import AuthContext from "../../context/AuthContext";


export default function FollowingList(){
    const [auth, setAuth] = useContext(AuthContext);
    const { name } = useParams();
  
    if (auth === null) {
      return <Navigate replace to="/" />;
    }
    return <Following name={name} />
  }