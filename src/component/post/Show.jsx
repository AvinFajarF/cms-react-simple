import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Ghost from "./../../images/Ghosty.gif";

// boostrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Toastfy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  // url path img
  const imgPath = "http://127.0.0.1:8000/images/";

  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = useState([]);

  //  commentar
  const [coba, setCoba] = useState(null);
  const token = localStorage.getItem("Authorization");
  const [comments, setComments] = useState([]);

  const handleChange = (event) => {
    setCoba(event.target.value);
  };

  const submitCommentar = async () => {
    try {
      if (token) {
        await axios
          .get("http://localhost:8000/sanctum/csrf-cookie")
          .then(() => {
            axios
              .post(
                "http://127.0.0.1:8000/api/v1/comentar",
                {
                  post_id: id,
                  content: coba,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                toast.success("💭 Berhasil memposting commentar!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });
          });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Terjadi Error", error.message);
    }
  };
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

    // fetch data commentar
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

    // fect data user
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

          <Card style={{ width: "58rem" }} className="m-auto mt-4">
            <Card.Img variant="top" src={imgPath + `${post.image}`} />
            <Card.Body>
              <Card.Title style={{ fontFamily: "Cursive" fontWi }}>{post.title}</Card.Title>
              <Card.Text className="text-truncate">{post.content}</Card.Text>
              <Button variant="primary">Views {post.views}</Button>
            </Card.Body>
          </Card>

          <h2 className="mt-4 ms-5 mb-5">Commentar</h2>

          {/* end post detail */}

          {/* modal commentar */}
          <div className="mb-3 w-25 ms-5">
            <label for="exampleFormControlTextarea1" className="form-label">
              content comentar
            </label>
            <textarea
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <button className="btn btn-primary mt-3" onClick={submitCommentar}>
              submit
            </button>
          </div>

          <ToastContainer />

          {/* End Modal Comentar */}

          {/* commentar */}
          {comments.map((comment) => {
            const user = users.find((user) => user.id === comment.user_id);

            return (
              <>
                <Card className="w-25 mt-5 ms-5" border="black">
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
