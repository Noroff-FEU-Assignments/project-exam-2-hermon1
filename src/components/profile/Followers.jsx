import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";


export default function FollowerList(props) {
    // let navigate = useNavigate();
  
    const [auth, setAuth] = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [posts, setPosts] = useState([])
    const [followers, setFollowers] = useState([])
  
    const url = BASE_URL + `/profiles/${props.name}?_followers=true`;
    useEffect(() => {
      async function getFollowersDetails() {
        const options = {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        };
        try {
          const response = await axios.get(url, options);
          const followersDetails = response.data.followers
          setFollowers(followersDetails)
  
        } catch (error) {
          setIsError("There was an error fetching your profile");
        } finally {
          setIsLoading(false);
        }
      }
      getFollowersDetails();
    }, [])
  
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isError) {
      return <div>{isError}</div>;
    }
    return (
      <div className="Followers_container">
        {followers.map((follower) => {
          return (
            <div>
              <Card.Img variant="top" src={follower.avatar} />
              <Link to={`/profile/${follower.name}`} name={follower.name} avatar={follower.avatar} className="follower_name">{follower.name}</Link>
            </div>
          )
        })}
      </div>
    )
  }