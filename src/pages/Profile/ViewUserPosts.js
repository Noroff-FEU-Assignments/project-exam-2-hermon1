import { useContext } from "react";
import { Navigate } from "react-router-dom";
import GetPostsList from "../../components/profile/PostsList";
import AuthContext from "../../context/AuthContext";
import HeaderImage from "../../assets/Header_Image.png"


export default function ViewUserPosts() {
    const [auth, setAuth] = useContext(AuthContext);
  
    if (auth === null) {
      return <Navigate replace to="/" />;
    }
  
    return (
      <>
        <div
          className="header_image"
          style={{ backgroundImage: `url(${HeaderImage})` }}
        >
          <h1>{auth.name}'s posts</h1>
        </div>
        <GetPostsList />;
      </>
    );
  }
  