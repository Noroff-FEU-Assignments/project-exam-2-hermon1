import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";


export default function UnFollowUser(props){
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [auth] = useContext(AuthContext);
  
    const updateUrl = BASE_URL + `/profiles/${props.name}/follow`;
  
    async function addFollow(){ 
      console.log("follow user")
      const options = {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      };
      console.log(options)
  
      try {
        const response = await axios.put(updateUrl, {}, options);
        window.location.reload(false);
  
      } catch (error) {
        console.log(error)
        // setIsError("There was an error adding you as a follower");
      } finally {
        setIsLoading(false);
      }
    }
  
    if (isError) {
      return <div>{isError}</div>;
    }
  
    return(
      <div>
        <button className="follow_button" onClick={addFollow}>Follow</button>
      </div>
    )
  }