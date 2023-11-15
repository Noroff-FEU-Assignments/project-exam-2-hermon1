import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import missingImage from "../../assets/missing_image.png";
import { Link } from "react-router-dom";



export default function UserList() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [auth] = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [isCompleted] = useState(false);
    const [offset, setoffset] = useState(20);
    const url = BASE_URL + `/profiles?sort=name&sortOrder=asc&_followers=true&_following=true&limit=20`;
    const token = auth.accessToken;
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
    useEffect(function () {
      async function getUserList() {
  
        try {
          const response = await axios.get(url, options);
          const users = response.data;
          setUsers(users);
        } catch (error) {
          setIsError("There was an error fetching the profile");
        } finally {
          setIsLoading(false);
        }
      }
  
      getUserList();
    }, );
    
    const loadMore = () => {
      setoffset(count => count + 10);
      async function getUserList() {  
        try {
          const response = await axios.get( BASE_URL + `/profiles?sort=name&sortOrder=asc&_followers=true&_following=true&offset=${offset}`, options);
          const newData = response.data;
          setUsers(users.concat(newData));
        } catch (error) {
          setIsError("There was an error fetching the profile");
        } finally {
          setIsLoading(false);
        }
      }
  
      getUserList();
    }
    // console.log(users)
  
    if (isLoading) {
      return <div>Loading</div>;
    }
  
    if (isError) {
      return <div>{isError}</div>;
    }
  
    return (
      <>
        <div>
          <div className="list_post-grid profile_card-list">
            {
              users.map((user) => {
                let image = missingImage;
  
                if (user.avatar) {
                  image = user.avatar;
                }
                return (
                  <div className="profile_card">
                    <Link to={`/profile/${user.name}`} name={user.name}>
                    <img src={image} alt="imagesource"/>
                    <h2>{user.name}</h2>
                    <div className="followers_container">
                      <p>Following: <span>{user.following.length}</span></p> |
                      <p>followers: <span>{user.followers.length}</span></p>
                    </div>
                    </Link>
                  </div>
  
                )
              })
            }
          </div>
        </div>
        <div className="load_button mt-3 mb-5">
          {isCompleted ? (
            <button
              onClick={loadMore}
              type="button"
              className="load_button"
            >
              That's It
            </button>
          ) : (
            <button onClick={loadMore} type="button" className="load_button">
              Load More Users
            </button>
          )}
        </div>
      </>
    )
  }