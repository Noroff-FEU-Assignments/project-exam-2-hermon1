import Heading from "../../components/Common/Heading";
import { useNavigate, useParams } from "react-router-dom";
import GetProfileDetails from "../../components/profile/ProfileDetails";


export default function Profile(props) {
    const { name } = useParams();
  
    return (
      <div className="container">
        <div className="content_container">
          <GetProfileDetails name={name} />
        </div>
      </div>
    );
  }
  