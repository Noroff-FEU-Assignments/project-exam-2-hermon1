import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";
import DeletePost from "../posts/DeletePost";


export default function GetPostsList() {
    // const navigate = useNavigate();
    const [auth, setAuth] = useContext(AuthContext);
    const userName = auth.name
    const url = BASE_URL + `/profiles/${userName}/posts?ortOrder=desc`;
  
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [message, setMessage] = useState(null)
  
    useEffect(function () {
      async function getPosts() {
        const token = auth.accessToken;
        const options = {
          headers: { Authorization: `Bearer ${token}` },
        };
        try {
          const response = await axios.get(url, options);
          const postsData = response.data;
          setPosts(postsData);
        } catch (error) {
          setIsError("There was an error fetching your posts");
        } finally {
          setIsLoading(false);
        }
  
      }
  
      getPosts();
    }, []);
  
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isError) {
      return <div>{isError}</div>;
    }
  
  
    if (posts.length === 0) {
      return <p>You don't have any posts. Add your first post <a href="/createposts">her!</a></p>;
    } else {
      return (
        <>
          {posts.map((post) => {
            console.log(post)
            return (
              <>
                <div className="container post_list_container">
                <Link to={`/post/${post.id}`}  key={post.id} value={post.id}>
                  <h2>{post.title}</h2>
                </Link>
                  <div>
                    <DeletePost  onClick={DeletePost} key={post.id} id={post.id}>Delete</DeletePost>
                    <Link className="edit" to={`/editPost/${post.id}`}>Edit</Link>
  
                  </div>
                </div>
              </>
            )
          })}
        </>
      )
  
    }
  }