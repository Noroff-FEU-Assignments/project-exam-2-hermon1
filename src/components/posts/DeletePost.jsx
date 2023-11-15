
import axios from "axios";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

export default function DeletePost({ id }) {
   
  
    const [auth] = useContext(AuthContext);
    const [show, setShow] = useState(false);
  

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  

    async function handleDelete() {
        const options = {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        };
        const url = BASE_URL + `/posts/${id}`
      
        try {
          const response = await axios.delete(url, options);
          if(response.status === 200){
            window.location.reload(false);
          }
      
        } catch (error) {
          console.log(error)
        }
      }

      return (
        <>
          <button type="button" className="delete" onClick={handleShow}>
            { "Delete"}
          </button>


<Modal show={show} onHide={handleClose}>
<Modal.Header>
  <Modal.Title>Modal heading</Modal.Title>
  <Button variant="secondary" onClick={handleClose}>
    x
  </Button>
</Modal.Header>
<Modal.Body>Are you sure you want to delete this post?</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="error" onClick={handleDelete}>
    Delete
  </Button>
</Modal.Footer>
</Modal>
</>
);
}