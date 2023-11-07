import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";


export default function FormEditPost(title) {
    const [post, setPost] = useState(null);
    const [convertedText, setConvertedText] = useState();
    const [auth, setAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    // const url = BASE_URL + "/posts"
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(null)
  

    let { id } = useParams();
    const url = BASE_URL + `/posts/${id}`;

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const options = {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      };

      useEffect(
        function () {
          async function getPost() {
            try {
              const response = await axios.get(url, options);
              const postData = response.data
              console.log(postData)
              setPost(postData);
            } catch (error) {
              setIsError(error.toString());
            } finally {
              setIsLoading(false);
            }
          }

          getPost();
        },
        []
      );


  async function CreatePost(data) {
    const options = {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    };

    const message = data.body;
    const title = data.title;
    const tags = [];
    const media = data.media
    tags.push(data.tags)

    const formData = {
      title: title,
      body: message,
      tags: tags,
      media: media
    };


    try {
        const response = await axios.put(url, formData, options)
        if(response.status === 200){
          setSuccessMessage(<p>Your post has been posted</p>)
          setTimeout(() => {
            navigate("/viewPosts");
          }, 1000);
        }
      } catch (error) {
        setIsError(error.response.data.errors[0].message)
      } finally {
        setIsLoading(false);
      }
      if (isError) {
        return <div>{isError}</div>;
      }
    }



  if (isLoading) {
    return <div>Loading</div>;
    //   if (!auth) {
    //     navigate('/')
    //   }
  }
  if (isError) {
    return <div>{isError}</div>;
  }


  return (<>
    <div className="message">{successMessage}</div>
    <Form className="edit_form" onSubmit={handleSubmit(CreatePost)}>
        <Form.Label>Title </Form.Label>
      <InputGroup className="mb-3">
        <div className="input_group-container">
          <input name="title"
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter title..."
            defaultValue={post.title}
          />
        </div>
        {errors.title && <span className="error">Please enter a title</span>}
      </InputGroup>



      <Form.Label>Body </Form.Label>
      <InputGroup className="mb-3">
        <div className="input_group-container">
          <textarea name="body"
            {...register("body")}
            type="text"
            defaultValue={post.body}
          />
        </div>
        {errors.body && <span className="error">Please enter a something in the body. Max 280 symboled</span>}
      </InputGroup>


      <Form.Label>media (use url)</Form.Label>
      <InputGroup className="mb-3">
        <div className="input_group-container">
          <input name="media"
            {...register("media")}
            type="url"
            defaultValue={post.media}
          />
        </div>
        {errors.media && <span className="error">Please enter a image url</span>}
      </InputGroup>



      <Form.Label>Tags </Form.Label>
      <InputGroup className="mb-3">
        <div className="input_group-container">
          <input name="tags"
            {...register("tags")}
            type="text"
            defaultValue={post.tags[0]}
          />
        </div>
      </InputGroup>



      <Button className="primary" type="submit">
        Update
      </Button>
    </Form>
  </>
  )
}