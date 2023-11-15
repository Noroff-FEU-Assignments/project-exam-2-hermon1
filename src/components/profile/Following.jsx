import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";


export default function Following(props) {

    const [auth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [following, setFollowing] = useState([])
  
    const url = BASE_URL + `/profiles/${props.name}?_following=true`;
    useEffect(() => {
      async function getFollowingDetails() {
        const options = {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        };
        try {
          const response = await axios.get(url, options);
          const followingDetails = response.data.following
          setFollowing(followingDetails)
          // console.log(followingDetails)
  
        } catch (error) {
          setIsError("There was an error fetching your profile");
        } finally {
          setIsLoading(false);
        }
      }
      getFollowingDetails();
    }, )
  
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isError) {
      return <div>{isError}</div>;
    }
    return (
      <div className="Followers_container">
        {following.map((following) => {
          return (
            <div>
              <Card.Img variant="top" src={following.avatar} />
              <Link to={`/profile/${following.name}`} name={following.name} avatar={following.avatar} className="follower_name">{following.name}</Link>
            </div>
          )
        })}
      </div>
    )
  }