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
import { Link } from "react-router-dom";

function Data() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // state
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);

  // token
  const token = localStorage.getItem("Authorization");

  //define state
  const [posts, setPosts] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //useEffect hook
  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(() => {
        axios
          .get("http://localhost:8000/api/v1/category", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setCategory(response.data.data);
            console.log(response.data.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });

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

          if (role != "superadmin") {
            navigate("/posts");
          }
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
  const [categoryId, setCategoryId] = useState(null);

  // tag
  const handleTag = (e) => {
    setTagCreate(e.target.value);
  };

  const Categoryids = (e) => {
    setCategoryId(e.target.value);
  };

  const TitleCreate = (event) => {
    setTitleCreate(event.target.value);
  };

  const ContentCreate = (event) => {
    setContentCreate(event.target.value);
  };

  console.log(categoryId);

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
                image: selectedFile,
                category_id: categoryId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
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
      <Container className="mt-3">
        <ToastContainer />
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Button
                  className="mb-3 btn-sm"
                  variant="primary"
                  onClick={handleShow}
                >
                  Create Post
                </Button>

                <Link
                  to={"/tags"}
                  className="btn btn-primary mb-3 btn-sm ms-2"
                  variant="primary"
                >
                  Create tag
                </Link>

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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label for="title" class="form-label">
              Title:{" "}
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              onChange={TitleCreate}
            />
          </div>

          <div class="mb-3">
            <label for="content" class="form-label">
              Content:{" "}
            </label>
            <input
              type="text"
              class="form-control"
              id="content"
              onChange={ContentCreate}
            />
          </div>

          <select
            class="form-select mt-4 mb-3"
            aria-label="Default select example"
            onChange={Categoryids}
          >
            <option selected hidden>
              Pilih category
            </option>
            {category.map((data) => {
              console.log(data.id);
              return <option value={data.id}>{data.name}</option>;
            })}
          </select>

          <div class="mb-3">
            <label for="formFile" class="form-label">
              File Gambar
            </label>
            <input
              class="form-control"
              type="file"
              onChange={onChangeHandler}
              id="formFile"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitCreatePost}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Data;
