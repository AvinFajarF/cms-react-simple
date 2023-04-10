//import hook useState dan useEffect from react
import { useState, useEffect } from "react";

//import component Bootstrap React
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
} from "react-bootstrap";

//import axios
import axios from "axios";

// Toastfy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function Data() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // state
  const [tag, setTag] = useState([]);

  // token
  const token = localStorage.getItem("Authorization");

  //define state
  const [posts, setPosts] = useState([]);

  //useEffect hook
  useEffect(() => {
    //pengecekan apakah user memiliki hak akses ke component ini
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("http://localhost:8000/api/v1/user/show", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { name, alamat, role, jenis_kelamin } = res.data.data;

          // if (role != "superadmin") {
          //   navigate("/posts");
          // }
        });
    });

    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get("http://localhost:8000/api/v1/post");
    const tag = await axios.get("http://localhost:8000/api/v1/tag", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // assign data to tag
    setTag(tag.data.data);

    //get response data
    const data = await response.data.data.data;

    //assign response data to state "posts"
    setPosts(data);
  };

  // untuk delete
  const handeleDeletePost = async (id) => {
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
            window.location.reload();
          }, 1000);
        });
    });
  };

  //modal create
  const [showCreate, setShowCreate] = useState(false);

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  // logic create

  const [titleCreate, setTitleCreate] = useState();
  const [contentCreate, setContentCreate] = useState();
  const [tagCreate, setTagCreate] = useState();

  // tag
  const handleTag = (e) => {
    setTagCreate(e.target.value);
  };

  const TitleCreate = (event) => {
    setTitleCreate(event.target.value);
  };

  const ContentCreate = (event) => {
    setContentCreate(event.target.value);
  };

  const submitCreatePost = async () => {
    if (!token) {
      toast.error("Error pastikan anda login dahulu!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios
            .post(
              "http://localhost:8000/api/v1/post",
              {
                title: titleCreate,
                content: contentCreate,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              toast.success("Berhasil membuat Post !", {
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
                window.location.reload();
              }, 1000);
            });
        });
    }
  };

  const handleAddTag = (id) => {
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .post(
          "http://localhost:8000/api/v1/post/addTag",
          {
            post_id: id,
            tag_id: tagCreate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
  };

  return (
    <>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span class="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li class="nav-item">
                  <a href="#" class="nav-link align-middle px-0">
                  <i class="bi bi-stickies"></i>{ " " }
                    <span class="ms-1 d-none d-sm-inline">Home</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col py-3">
            <div className="col py-3">
              <Container className="mt-3">
                <ToastContainer />
                <Row>
                  <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                      <Card.Body>
                        <Button
                          variant="success"
                          className="mb-3"
                          onClick={handleShowCreate}
                        >
                          Create post
                        </Button>
                        <Table striped bordered hover className="mb-1">
                          <thead>
                            <tr>
                              <th>NO.</th>
                              <th>TITLE</th>
                              <th>CONTENT</th>
                              <th>VIEWS</th>
                              <th>AKSI</th>
                            </tr>
                          </thead>
                          <tbody>
                            {posts.map((post, index) => (
                              <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.views}</td>
                                <td className="text-center">
                                  <button
                                    onClick={() => handeleDeletePost(post.id)}
                                    className="btn btn-outline-danger btn-sm"
                                  >
                                    Delete
                                  </button>

                                  <a
                                    href={`/posts/data/${post.id}/edit`}
                                    className="btn btn-outline-primary btn-sm ms-2"
                                  >
                                    Edit
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Data;
