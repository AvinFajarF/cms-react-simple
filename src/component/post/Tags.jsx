import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Tags() {
  const { id } = useParams();
  const [tagFind, setTagFind] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios.get("http://localhost:8000/api/v1/post").then((res) => {
            setPost(res.data.data.data);
          });
        });
    };

    const tagFind = async () => {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios
            .get(`http://localhost:8000/api/v1/tag/${id}/post`)
            .then((res) => {
              setTagFind(res.data.data);
            });
        });
    };

    getPost();
    tagFind();
  }, []);

  return (
    <>

      <div className="container">
        <div className="row">
          {tagFind.map((tag) => {
            const dataPost = post.find((item) => item.id === tag.post_id);
            console.log(dataPost.title);

            return (
              <>
                <div className="col mt-4" key={dataPost.id}>
                  <div class="card h-100">
                    <img
                      src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      class="card-img-top"
                      height="250px"
                      alt={dataPost.title}
                    />
                    <div class="card-body">
                      <h5 class="card-title fw-bold">{dataPost.title}</h5>
                      <p class="card-text">{dataPost.content}</p>
                      <Link
                        to={`/posts/${dataPost.id}`}
                        class="btn btn-primary"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Tags;
