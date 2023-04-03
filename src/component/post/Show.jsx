import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";
import Ghost from "./../../images/Ghosty.gif";

// boostrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

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

  const [content, setContent] = useState();
  const [title, setTitle] = useState();

  // navigate
  const navigate = useNavigate()

  //  commentar
  const [coba, setCoba] = useState(null);
  const token = localStorage.getItem("Authorization");
  const [comments, setComments] = useState([]);

  const handleChange = (event) => {
    setCoba(event.target.value);
  };

  const submitCommentar = async () => {
    try {
      // pengecekan apakah si user sudah ada token
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
            setCoba("");
          });
      } else {
        // jika tidak ada munculkan pesan flash massage
        toast.error("Error memposting commentar! harus login dahulu", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log("Terjadi Error", error.message);
    }
  };
  // end commentar logic

  useEffect(() => {
    const getPost = async () => {
      try {
        // mengambil data post
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/post/show/${id}`
        );

        // set data untuk nilai update
        setTitle(data.data.title);
        setContent(data.data.content);

        // memberikan waktu untuk loading
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setPost(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    // fetch data detail
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

  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update post
  const Title = (event) => {
    setTitle(event.target.value);
  };

  const Content = (event) => {
    setContent(event.target.value);
  };

  const handleUpdate = async () => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .put(
          `http://localhost:8000/api/v1/post/${id}`,
          {
            title: title,
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Berhasil mengupdate post!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch(() => {
          toast.error("Error mengupdate post!", {
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
  };

  // untuk delete
  const handeleDeletePost = async () => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .delete(`http://localhost:8000/api/v1/post/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil delete post!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate('/post')
          },1000)
        });
    });
  };

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
              <Card.Title>{post.title}</Card.Title>
              <Card.Text className="text-truncate">{post.content}</Card.Text>
              <Button variant="primary">Views {post.views}</Button>
              <Button className="ms-5" variant="primary" onClick={handleShow}>
                Update Post
              </Button>
              <Button
                className="ms-5"
                variant="primary"
                onClick={handeleDeletePost}
              >
                Delete Post
              </Button>
            </Card.Body>
          </Card>

          {/* Modal update post */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* title */}
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                value={title}
                onChange={Title}
                className="form-control"
                id="title"
                placeholder="Title"
              />
              {/* content */}
              <label for="content" class="form-label">
                Content :
              </label>
              <textarea
                value={content}
                onChange={Content}
                placeholder="Content"
                class="form-control"
                id="content"
                rows="3"
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* End Modal update post */}

          <h2 className="mt-4 ms-5 mb-5">Commentar</h2>

          {/* end post detail */}

          {/*  commentar */}
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

          {/* End  Comentar */}

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
