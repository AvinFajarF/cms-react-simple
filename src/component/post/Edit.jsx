import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// toastfy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const { id } = useParams();

  // token
  const token = localStorage.getItem("Authorization");

  // state
  const [tag, setTag] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [tagId, setTagId] = useState();

  useEffect(() => {
    const getTag = async () => {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios
            .get("http://localhost:8000/api/v1/tag", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setTag(res.data.data);
            });
        });
    };

    const getPost = async () => {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios
            .get(`http://localhost:8000/api/v1/post/show/${id}`)
            .then((res) => {
              const { title, content } = res.data.data;
              setTitle(title);
              setContent(content);
            });
        });
    };

    getPost();
    getTag();
  }, []);

  const edit = async () => {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        await axios.put(
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
        ).then(() => {
          toast.success("Berhasil edit post", {
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
          .post(
            "http://localhost:8000/api/v1/post/addTag",
            {
              post_id: id,
              tag_id: tagId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
      });
  };

  return (
    <div>
      <div className="container" border="primay">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <div className="card">
              <div className="card-header bg-primary text-white h-25 fw-bold">
                Edit Post{" "}
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-3">
                    {/* title input */}
                    <label htmlFor="title">Title :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* content input */}
                  <div className="form-group mb-3">
                    <label htmlFor="content">Content:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="content"
                    />
                  </div>

                  {/* select tag */}
                  <div className="form-group mb-3">
                    <label htmlFor="tag">Tag: </label>
                    <select
                      id="tag"
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setTagId(e.target.value)}
                    >
                      <option selected hidden>
                        Pilih tag
                      </option>
                      {tag.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                    </select>
                  </div>

                  <br />
                  <button
                    onClick={edit}
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Submit
                  </button>

                  <a href="/posts/data" className="btn btn-outline-info btn-sm ms-2">Back</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
