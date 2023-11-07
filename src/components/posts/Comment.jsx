import axios from "axios";
import { useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


export default function Comments(props) {
    const { id } = useParams();
    const url = BASE_URL + `/posts/${id}/comment`
    const [auth, setAuth] = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState(null);
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const options = {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    };
    useEffect(function () {
      async function GetComments() {
        const commentUrl = BASE_URL + `/posts/${id}?_comments=true`;
        try {
          const response = await axios.get(commentUrl, options);
          const commentsData = response.data.comments
          setComments(commentsData)
        } catch (error) {
          const errorMessage = <div className="error">{error.response.data.errors[0].message}</div>;
          setIsError(errorMessage);
  
        } finally {
          setIsLoading(false);
        }
      }
      GetComments();
    }, [])
  

  async function PostNewComment(data) {
    const formData = {
      body: data.body,
      replyToId: null,
      id: 0,
      postId: props.id,
      owner: auth.name
    };


    setComments(comments.concat(formData))
    try {
      const response = await axios.post(url, formData, options);
      if (response.status === 200) {
        setSuccessMessage(`<div className="success"><p>You ar now logging in!</p></div>`)
      }
    } catch (error) {
      const errorMessage = <div className="error">{error.response.data.errors[0].message}</div>;
      setIsError(errorMessage);

    }
  }


  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }


  return (
    <div>
      <div className="comments">
        {
          comments.map((comment) => {
            return (
              <div key={comment.id} className="comment_container">
                <div className="comment_owner">
                  <Link
                    to={`/profile/${[comment.owner]}`}
                    key={comment.owner}
                  >
                    {comment.owner}
                  </Link></div>
                <div className="comment_body"><p>{comment.body}</p></div>
              </div>
            )
          })
        }
      </div>
      <Form className="form_container" onSubmit={handleSubmit(PostNewComment)}>
        <Form.Group className="mb-3" >
          <Form.Label>Comment: </Form.Label>

          <InputGroup className="mb-3">
            <div className="input_group-container">
              <InputGroup.Text id="basic-addon1"></InputGroup.Text>
              <Form.Control
                {...register("body", { required: true, minLength: 5 })}
                type="text"
                placeholder="Write your comment her.."
              />
            </div>
            {errors.comment && <span className="error">Please enter a valid comment</span>}
          </InputGroup>
        </Form.Group>

        <Button className="primary" type="submit">
          Comment
        </Button>
      </Form>
      <div>
        {successMessage}
      </div>
    </div>
  )
}