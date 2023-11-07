import FormEditPost from "../../components/posts/EditPost";
import HeaderImage from "../../assets/Header_Image.png"


export default function EditPost(){
    return(
      <div>
      <div className="header_image" style={{ backgroundImage: `url(${HeaderImage})` }}>
      <h1>Edit your post</h1>
  
      </div>
      <FormEditPost/>
      </div>
    )
  }