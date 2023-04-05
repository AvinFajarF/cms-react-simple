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
} from "react-bootstrap";

//import axios
import axios from "axios";

// Toastfy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function Data() {
  const navigate = useNavigate();

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
            .then(() => {
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

  return (
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
                        <Button
                          variant="danger"
                          className="me-3 btn-sm"
                          onClick={() => handeleDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* title */}
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            value={titleCreate}
            onChange={TitleCreate}
            className="form-control"
            id="title"
            placeholder="Title"
          />
          {/* content */}
          <label for="content" class="form-label">
            Content :
          </label>
          <textarea
            value={contentCreate}
            onChange={ContentCreate}
            placeholder="Content"
            class="form-control"
            id="content"
            rows="3"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
          <Button variant="primary" onClick={submitCreatePost}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Data;
