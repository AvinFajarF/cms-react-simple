import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
} from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tag() {
  const token = localStorage.getItem("Authorization");

  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShows = () => setShows(true);
  const handleClosed = () => setShows(false);

  const handleCloseEdit = () => setShow(false);
  const handleShowEdit = () => setShow(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState([]);

  const [nameEdit, setNameEdit] = useState();
  const [descriptionEdit, setDescriptionEdit] = useState();
  const [id, setId] = useState()

  useEffect(() => {
    const getTagAll = async () => {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios
            .get("http://localhost:8000/api/v1/tag", {
              Headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              setTag(res.data.data);
            });
        });
    };

    getTagAll();
  }, []);

  const handleUpdate = async (id) => {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        axios.get(`http://localhost:8000/api/v1/tag/show/${id}`).then((res) => {
          const { id, name, description } = res.data.data;
          setNameEdit(name);
          setDescriptionEdit(description);
          setId(id)
        });


        axios.put(`http://localhost:8000/api/v1/tag/edit/${id}`, {
          name: nameEdit,
          description: descriptionEdit
        }, {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
          console.log(res);
        })

      });

      setShow(true)
  };

  const handleUpdateSubmit = async () => {
    

    await axios
    .get("http://localhost:8000/sanctum/csrf-cookie")
    .then(async () => {
      axios.put(`http://localhost:8000/api/v1/tag/edit/${id}`, {
        name: nameEdit,
        description: descriptionEdit
      }, {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
        toast.success('Berhasil update Post!', {
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
            window.location.reload()
          }, 1000);
      }).catch(() => {
        toast.error('Error update post!', {
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

    });



  }


  const handeleDeletePost = async (id) => {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        await axios
          .delete(`http://localhost:8000/api/v1/tag/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            toast.success('Berhasil delete post!', {
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
                window.location.reload()
              }, 1000);
          }).catch(() => {
            toast.error('Error update post!', {
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
      });
  };

  const handleCreateTag = async () => {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        await axios
          .post(
            "http://localhost:8000/api/v1/tag",
            {
              name: name,
              description: description,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            toast.success('Berhasil membuat post!', {
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
                window.location.reload()
              }, 1000);
          }).catch(() => {
            toast.error('Error create post!', {
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
      });
  };

  return (
    <>
            <ToastContainer />
      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Button
                  className="mb-3 btn-sm"
                  variant="primary"
                  onClick={handleShows}
                >
                  Create Tag
                </Button>

                <Table striped bordered hover className="mb-1">
                  <thead>
                    <tr>
                      <th>NO.</th>
                      <th>NAME</th>
                      <th>DESCRIPTION</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tag.map((tag, index) => (
                      <tr key={tag.id}>
                        <td>{index + 1}</td>
                        <td>{tag.name}</td>
                        <td>{tag.description}</td>
                        <td className="text-center">
                          <button
                            onClick={() => handeleDeletePost(tag.id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            Delete
                          </button>

                          <button
                            className="btn btn-outline-primary ms-2 btn-sm"
                            onClick={() => handleUpdate(tag.id)}
                          >
                            Edit Tag
                          </button>
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

      {/* modal create */}
      <Modal show={shows} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label for="name" class="form-label">
              Name:{" "}
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name tags"
            />
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">
              Description:{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              class="form-control"
              id="description"
            />
            <input hidden type="text" class="form-control" id="description" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosed}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTag}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal edit */}
      <Modal show={show} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label for="name" class="form-label">
              Name:{" "}
            </label>
            <input
              type="text"
              class="form-control"
              value={nameEdit}
              onChange={(e) => setNameEdit(e.target.value)}
              id="name"
              placeholder="name tags"
            />
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">
              Description:{" "}
            </label>
            <input
              value={descriptionEdit}
              type="text"
              onChange={(e) => setDescriptionEdit(e.target.value)}
              placeholder="description"
              class="form-control"
              id="description"
            />
            <input hidden type="text" class="form-control" id="description" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Tag;
