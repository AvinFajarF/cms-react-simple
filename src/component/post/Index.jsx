  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import Ghost from "./../../images/Ghosty.gif";

  // import css
  import "./css/Data.css";
  import { Link } from "react-router-dom";

  function App() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/post");
          setData(response.data.data.data);

          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      };

    
      getData();
    }, []);


    return (
      <>
        {loading ? (
          <img src={Ghost} alt="" className="m-auto" srcset="" />
        ) : (
          <>
            <div class="card text-bg-dark border-0">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay d-flex justify-content-center flex-column ms-4">
                <h5 class="card-title display-3 fw-bolder mb-0">Blog</h5>
                <p class="card-text lead fs-2">
                  Silahkan buat blog anda agar dapat di lihat orang lain.
                </p>
              </div>
            </div>

  <br />
            <div className="container mt-5">
              <div className="row row-cols-3 d-flex flex-wrap">
                {data.map((post) => {
                  return (
                    <div className="col mt-4" key={post.id}>
                      <div class="card h-100">
                        <img src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top"  height="250px" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title fw-bold">{post.title}</h5>
                          <p class="card-text">
                          {post.content}
                          </p>
                          <Link to={`/posts/${post.id}`} class="btn btn-primary">
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </>
        )}
      </>
    );
  }

  export default App;
