import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Ghost from "./../../images/Ghosty.gif";

// boostrap
import Card from "react-bootstrap/Card";

// Toastfy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Form } from "react-bootstrap";

const Post = () => {
  const { id } = useParams();
  const [comment, setComment] = useState([]);
  const [post, setPost] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = useState([]);

  const [content, setContent] = useState();
  const [title, setTitle] = useState();

  const [postId, setPostId] = useState();

  const [tag, setTag] = useState([]);
  const [tagAll, setTagAll] = useState([]);

  //  commentar
  const [coba, setCoba] = useState("");
  const token = localStorage.getItem("Authorization");
  const [comments, setComments] = useState([]);

  // comment reply
  const [showReply, setShowReply] = useState(false);

  const handleCloseReply = () => setShowReply(false);
  const handleShowReply = () => setShowReply(true);
  const [perentId, setPerentId] = useState();

  const [category, setCategory] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState([]);

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
                    "Content-Type": "application/json",
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

            axios
              .get("http://localhost:8000/api/v1/comentar", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setComments(res.data.data);
              });

            handleChange(" ");
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

  // fetch data detail
  const getComments = async () => {
    try {
      axios
        .get("http://localhost:8000/api/v1/comentar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setComments(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const submitCommentarReply = async () => {
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
                  parent_id: perentId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                toast.success("💭 Berhasil reply commentar!", {
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

            axios
              .get("http://localhost:8000/api/v1/comentar", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setComments(res.data.data);
              });
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
    const getCategorys = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/categorys"
        );
        setCategory(response.data.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/category"
        );
        setCategoryDetail(response.data.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };

    const getPost = async () => {
      try {
        // mengambil data post
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/post/show/${id}`
        );

        setPostId(data.data.id);

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

    const getTag = async () => {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios
            .get(`http://localhost:8000/api/v1/tag/find/${id}`)
            .then((res) => {
              setTagAll(res.data.data);
            });

          await axios.get("http://localhost:8000/api/v1/tag").then((res) => {
            setTag(res.data.data);
          });
        });
    };

    getTag();

    getUser();
    getCategorys();
    getCategory();
    getPost();
    getComments();
  }, []);

  const handleDeleteComment = async (id) => {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        await axios
          .delete(`http://localhost:8000/api/v1/comentar/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            toast.success("Success mengahpus commentar!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            axios
              .get("http://localhost:8000/api/v1/comentar", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setComments(res.data.data);
              });
          })
          .catch(() => {
            toast.error("Error menghapus commentar!", {
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

  const [updateComment, setUpdateComment] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleShowUpdateModal = (comment) => {
    setUpdateComment(comment);
    setShowUpdateModal(true);
  };

  // update comment
  const handleUpdateComment = async (comment) => {
    try {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios.put(
            `http://localhost:8000/api/v1/comentar/${comment.id}`,
            comment,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
        .then(() => {
          toast.success("Success edit commentar!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          axios
            .get("http://localhost:8000/api/v1/comentar", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setComments(res.data.data);
            });
        })
        .catch(() => {
          toast.error("Error edit commentar!", {
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

      const updatedComment = comments.map((c) =>
        c.id === comment.id ? comment : c
      );
      setComment(updatedComment);
      setShowUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <img src={Ghost} alt="" className="m-auto" srcset="" />
      ) : (
        <>
          {/* post  detail */}

          <div class="card mb-3 w-75 m-auto mt-5">
            <img
              src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title fw-bold">{post.title}</h5>
              <p class="card-text mt-2">{post.content}</p>
              <p class="card-text">
                <small class="text-muted">{post.created_at}</small>
                {tagAll.map((item) => {
                  const tags = tag.find((items) => item.tag_id === items.id);

                  return (
                    <a
                      href={`/posts/tags/${tags.id}`}
                      class="text-muted ms-3 text-decoration-none"
                    >
                      #{tags.name}
                    </a>
                  );
                })}
                ;
                {category.map((data) => {
  const categorys = category.find(
    (item) => postId === data.post_id
  );
  var category_id = categorys?.category_id;
  return categoryDetail.map(item => {
    if (item.id === category_id) {
      console.log(data.id);
      return (
        <a key={item.id} href={`/category/${data.id}/post`} className="text-muted ms-3 text-decoration-none">
          {item.name}
        </a>
      );
    } else {
      return null;
    }
  });
})}

              </p>
            </div>
          </div>

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
          {comments
            .filter((comment) => !comment.parent_id)
            .map((comment) => (
              <div key={comment.id}>
                <Card className="w-25 mt-5 ms-5" border="black">
                  <Card.Header>Comments</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>{comment.content}</p>
                      <footer className="blockquote-footer">
                        Created By{" "}
                        <cite title="Source Title">
                          {
                            users.find((user) => user.id === comment.user_id)
                              ?.name
                          }
                        </cite>
                      </footer>
                      <button
                        onClick={() => {
                          handleShowReply();
                          setPerentId(comment.id);
                        }}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-reply"></i>
                      </button>
                      <button
                        className="btn btn-outline-warning btn-sm ms-2"
                        onClick={() => handleShowUpdateModal(comment)}
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </blockquote>
                  </Card.Body>
                </Card>
                {comments
                  .filter((c) => c.parent_id === comment.id)
                  .map((reply) => (
                    <Card
                      key={reply.id}
                      className="w-25 mt-3 "
                      style={{ marginLeft: "150px" }}
                      border="black"
                    >
                      <Card.Header>Reply Comments</Card.Header>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p>{reply.content}</p>
                          <footer className="blockquote-footer">
                            Created By{" "}
                            <cite title="Source Title">
                              {
                                users.find((user) => user.id === reply.user_id)
                                  ?.name
                              }
                            </cite>
                          </footer>
                          <button
                            className="btn btn-outline-warning btn-sm ms-2"
                            onClick={() => handleShowUpdateModal(reply)}
                          >
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm ms-2"
                            onClick={() => handleDeleteComment(reply.id)}
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                          {/* <button onClick={() => { handleShowReply(); setPerentId(reply.id); }} className="btn btn-outline-primary btn-sm"><i className="bi bi-reply"></i></button> */}
                        </blockquote>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            ))}

          {/* end commentar */}
        </>
      )}

      <Modal show={showReply} onHide={handleCloseReply}>
        <Modal.Header closeButton>
          <Modal.Title>Reply Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content:{" "}
            </label>
            <textarea
              onChange={handleChange}
              className="form-control"
              placeholder="isi comment anda"
              id="content"
              rows="3"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReply}>
            Close
          </Button>
          <Button variant="primary" onClick={submitCommentarReply}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* update comment */}

      {/* modal update comment */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={updateComment.content}
                onChange={(e) =>
                  setUpdateComment({
                    ...updateComment,
                    content: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => handleUpdateComment(updateComment)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
