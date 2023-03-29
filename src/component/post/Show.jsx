import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Ghost from "./../../images/Ghosty.gif";

// boostrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  // modal
  const [show, setShow] = useState(false);

  //  commentar
  const [coba, setCoba] = useState(null)
  const token = localStorage.getItem("Authorization")

  const handleChange = (event) => {
    setCoba(event.target.value);
  }

  const modalClose = () => setShow(false)

  const handleClose = async () => {
    setShow(false);
    await axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios.post(
          "http://127.0.0.1:8000/api/v1/comentar",
          {
            post_id: id,
            content: coba,
          },
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        ).then(cobas => {
          console.log(cobas);
        })
       
    });
  };
  const handleShow = () => setShow(true);
  // end commentar logic

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/post/show/${id}`
        );

        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setPost(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getComments = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/post/show/${id}`
        );
        setComments(data.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/v1/dashboard/admin/user"
        );
        setUsers(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();

    getPost();
    getComments();
  }, [id]);

  
  return (
    <>
      {loading ? (
        <img src={Ghost} alt="" className="m-auto" srcset="" />
      ) : (
        <>
          {/* post  detail */}
          <Card className="w-50 m-auto mt-4" border="primary">
            <Card.Header>Detail Postingan</Card.Header>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text className="text-truncate">{post.content}</Card.Text>
              <Button variant="primary">Views {post.views}</Button>
            </Card.Body>
          </Card>

          <h2 className="mt-4 text-center">Commentar</h2>

          {/* end post detail */}

          {/* modal commentar */}
          <Button variant="primary" onClick={handleShow}>
            Add Commentar
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Commentar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Content Comentar</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={modalClose}>
                Close
              </Button>
              <Button variant="primary" className={token ? '' : 'd-none'} onClick={handleClose}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          {/* End Modal Comentar */}

          {/* commentar */}
          {comments.map((comment) => {
            const user = users.find((user) => user.id === comment.user_id);

            return (
              <>
                <Card className="w-25 mt-3 m-auto" border="black">
                  <Card.Header>Comments</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p> {comment.content} </p>
                      <footer className="blockquote-footer">
                        Created By <cite title="Source Title">{user.name}</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </>
            );
          })}

          {/* end commentar */}
        </>
      )}
    </>
  );
};

export default Post;
