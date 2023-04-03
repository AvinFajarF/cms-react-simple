import axios from "axios";
import React, { useState } from "react";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [title, setTitle] = useState(null);
  const [contents, setContents] = useState(null);
  const token = localStorage.getItem("Authorization");

  const titles = (event) => {
    setTitle(event.target.value);
  };

  const content = (event) => {
    setContents(event.target.value);
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
              title: title,
              content: contents,
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
          });
      });
    }

  };

  return (
    <>
      <ToastContainer />
      <div className="container" border="primay">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <div className="card">
              <div className="card-header bg-primary text-white">Create</div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label htmlFor="title">Title :</label>
                    <input
                      type="text"
                      onChange={titles}
                      className="form-control"
                      id="title"
                      placeholder="Title"
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label for="content" class="form-label">
                      Content :
                    </label>
                    <textarea
                      onChange={content}
                      placeholder="Content"
                      class="form-control"
                      id="content"
                      rows="3"
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitCreatePost}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
