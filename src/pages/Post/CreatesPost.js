import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Heading from "../../components/Common/Heading";
import CreatePostForm from "../../components/posts/CreatePost";
import AuthContext from "../../context/AuthContext";
import HeaderImage from "../../assets/Header_Image.png";


export default function CreatePost() {
    const [auth] = useContext(AuthContext);

    if (auth === null) {
        return <Navigate replace to="/" />;
      }



  return (
    <>
      <div
        className="header_image"
        style={{ backgroundImage: `url(${HeaderImage})` }}
      >
        <Heading title="Create Post" />
      </div>
      <CreatePostForm />
    </>
  );
}
