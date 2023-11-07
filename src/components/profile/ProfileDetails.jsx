import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import missingImage from "../../assets/missing_profile_image.png";
import missingAvatar from "../../assets/missing_profile_image.png";
import missingBanner from "../../assets/Header_Image.png"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import FollowUser from "./FollowUser";
import UnFollowUser from "./UnfollowUser";


export default function GetProfileDetails(props) {
    let navigate = useNavigate();
    const [auth, setAuth] = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [posts, setPosts] = useState([])
    const [followers, setFollowers] = useState([])
  
    const url = BASE_URL + `/profiles/${props.name}?sort=created&sortOrder=desc&_followers=true&_following=true&_posts=true`;
  
    useEffect(() => {
      async function getUserDetails() {
        if (auth === null) {
          navigate('/')
        } else {
          const options = {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          };
          try {
            const response = await axios.get(url, options);
            const userDetails = response.data
            setPosts(userDetails.posts)
            setUserData(userDetails)
            setFollowers(userDetails.followers)
  
          } catch (error) {
            setIsError("There was an error fetching your profile");
          } finally {
            setIsLoading(false);
          }
        }
      }
      getUserDetails();
    }, [])
  
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isError) {
      return <div>{isError}</div>;
    }
  
    let avatar;
    let banner;
    if (auth.name !== userData.name) {
      if (userData.avatar == null) {
        avatar = missingAvatar;
      } else {
        avatar = userData.avatar
      }
      if (userData.banner == null) {
        banner = missingBanner;
      } else {
        banner = userData.banner
      }
  
      let following = false;
      followers.map((followers) => {
        if (followers.name === auth.name) {
          following = true;
        }
      })
      let followButton
      let isOpen = false
  
      if (following === true) {
        followButton = <UnFollowUser name={props.name} />
      } else {
        followButton = <FollowUser name={props.name} />
      }
      return (
        <div>
          <div className="banner_container" style={{ backgroundImage: `url(${banner})` }}>
            {followButton}
          </div>
          <div className="user_info-container">
            <div className="avatar_container">
              <img src={avatar} />
            </div>
            <div className="username_container">
              <h1>{props.name}</h1>
              <div className="following_container">
                <Link to={`/followers/${userData.name}`} name={userData.name}>
                  <p>Followers: {userData.followers.length}</p>
                </Link>
                |
                <Link to={`/following/${userData.name}`} name={userData.name}>
                  <p>Following: {userData.following.length}</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="posts_container">
            {posts.map((post) => {
              let image = missingImage;
  
              if (post.media) {
                image = post.media;
              }
              return (
                <>
                  <div className="post_details">
                    <div>
                      <img src={image} />
                    </div>
                    <div className="text_container">
                      <h2>{post.title}</h2>
                      <Link to={`/post/${[post.id]}`} key={post.id} value={post.id} className="button">Read More</Link>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{auth.name}</h1>
          <div className="following_container">
            <Link to={`/followers/${userData.name}`} name={userData.name}>
              <p>Followers: {userData.followers.length}</p>
            </Link>
            |
            <Link to={`/following/${userData.name}`} name={userData.name}>
              <p>Following: {userData.following.length}</p>
            </Link>
          </div>
          <div className="posts_container">
            {posts.map((post) => {
              let image = missingImage;
  
              if (post.media) {
                image = post.media;
              }
              return (
                <>
                  <div className="post_details">
                    <div>
                      <img src={image} />
                    </div>
                    <div className="text_container">
                      <h2>{post.title}</h2>
                      <Link to={`/post/${[post.id]}`} key={post.id} value={post.id} className="button">Read More</Link>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      )
    }
  }