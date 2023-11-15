import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";


export default function UnFollowUser(props){
    const [ setIsLoading] = useState(true);
    const [isError] = useState(null);
    const [auth] = useContext(AuthContext);
  
    async function addFollow(){ 
      console.log("follow user")
      const options = {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      };
      console.log(options)
  
      try {
       
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