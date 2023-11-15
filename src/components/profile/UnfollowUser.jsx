import { useState } from "react";


export default function UnfollowUser(props){
    const [ setIsLoading] = useState(true);
    const [isError] = useState(null);

  
  
    async function removeFollow(){ 
      
  
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
        <button className="follow_button" onClick={removeFollow}>Unfollow</button>
      </div>
    )
  }