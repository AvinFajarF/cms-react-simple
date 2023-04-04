import axios from "axios";
import React, { useEffect, useState } from "react";

// boostrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("Authorization");
  const [data, setData] = useState();

  // data users
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [tanggalLahir, setTanggalLahir] = useState();
  const [jenisKelamin, setJenisKelamin] = useState();
  const [alamat, setAlamat] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .get("http://localhost:8000/api/v1/user/show", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
        });
    });
  }, [token]);

  // onchange data user

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeTanggalLahir = (event) => {
    setTanggalLahir(event.target.value);
    console.log(event.target.value);
  };

  const onChangeJenisKelamin = (event) => {
    setJenisKelamin(event.target.value);
  };

  const onChangeAlamat = (event) => {
    setAlamat(event.target.value);
  };

  // onClickUdpdate
  const handleUpdate = () => {
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .put(
          `http://localhost:8000/api/v1/user/update/${data.id}`,
          {
            name: name,
            email: email,
            tanggal_lahir: tanggalLahir,
            jenis_kelamin: jenisKelamin,
            alamat: alamat,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Update profile berhasil!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(res);
        })
        .catch(() => {
          toast.error("Update profile ERROR!", {
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

      if (!token) {
        toast.error("Update profile ERROR!", {
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
    });
  };

  return (
    <>
      <ToastContainer />
      <div class="container mt-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-7">
            <div class="card p-3 py-4">
              <div class="text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT453YCd0ohVB2y_6xzkBzlc9htmUHXt4iTNg&usqp=CAU"
                  width="100"
                  class="rounded-circle"
                />
              </div>

              <div class="text-center mt-3">
                <h5 class="mt-2 mb-0">{data.name}</h5>
                <span>{data.email}</span>

                <div class="px-4 mt-3">
                  <p class="fonts">
                    Hallo nama saya {data.name}, saya berjenis kelamin{" "}
                    {data.jenis_kelamin}. saya tinggal di {data.alamat} saya
                    lahir pada tanggal {data.tanggal_lahir}
                  </p>
                </div>

                <div class="buttons">
                  <button
                    onClick={handleShow}
                    class="btn btn-outline-primary px-4"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* name */}
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            onChange={onChangeName}
            className="form-control"
            id="name"
            placeholder="name"
          />

          {/* email */}
          <label htmlFor="email" className="mt-3">
            Email :
          </label>
          <input
            onChange={onChangeEmail}
            type="text"
            className="form-control"
            id="email"
            placeholder="email"
          />

          {/* tanggal lahir */}
          <label htmlFor="tanggalLahir" className="mt-3">
            Tanggal lahir :
          </label>
          <input
            type="date"
            onChange={onChangeTanggalLahir}
            className="form-control"
            id="tanggalLahir"
            placeholder="Tanggal lahir"
          />

          {/* jenis kelamin */}
          <label htmlFor="jenis-kelamin" className="mt-3">
            Jenis Kelamin :
          </label>
          <select
            onChange={onChangeJenisKelamin}
            class="form-select"
            aria-label="Default select example"
          >
            <option selected hidden>
              pilih jenis kelamin
            </option>
            <option value="laki-laki">laki-laki</option>
            <option value="wanita">wanita</option>
          </select>

          {/* alamat */}

          <label htmlFor="alamat" className="mt-3">
            Alamat :
          </label>
          <input
            type="text"
            className="form-control"
            id="alamat"
            onChange={onChangeAlamat}
            placeholder="alamat"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
