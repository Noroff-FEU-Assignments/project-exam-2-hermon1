import { useContext} from "react";
import AuthContext from "../../context/AuthContext";
import missingBanner from "../../assets/Header_Image.png";
import EditUser from "../../components/SideBar/SideBare";
import GetProfileDetails from "../../components/profile/ProfileDetails";
import { Navigate } from "react-router";


export default function UserProfile() {
   
    const [auth] = useContext(AuthContext);
  
    if (auth === null) {
      return <Navigate replace to="/" />;
    }
  
    let banner;
    if (auth.banner.length === 0) {
      banner = banner = missingBanner;
    } else {
      banner = auth.banner;
    }
    return (
      <>
        <div
          className="banner_container"
          
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="container profile_container">
          <div className="sidebar_container">
            <EditUser />
          </div>
          <div className="content_container">
            <GetProfileDetails name={auth.name} />
          </div>
        </div>
      </>
    );
  }
  