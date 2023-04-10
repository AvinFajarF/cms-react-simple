import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Ghost from "./../../images/Ghosty.gif";

// boostrap
import Card from "react-bootstrap/Card";

// Toastfy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = useState([]);

  const [content, setContent] = useState();
  const [title, setTitle] = useState();

  const [tag, setTag] = useState([]);
  const [tagAll, setTagAll] = useState([]);

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

    getPost();
    getComments();
  }, []);

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

                  return <a href={`/posts/tags/${tags.id}`} class="text-muted ms-3 text-decoration-none">#{tags.name}</a>;
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