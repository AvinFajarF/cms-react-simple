import React, { useEffect, useState } from "react";
import axios from "axios";
import Ghost from "./../../images/Ghosty.gif";

// import css
import "./css/Data.css";
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/post");
        setData(response.data.data.data.reverse());

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
          <div
            id="carouselExampleCaptions"
            class="carousel slide"
            data-bs-ride="false"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
             {data
  .filter((e) => e.is_pinned == 1)
  .map((post) => {
    return (
      <div class="carousel-item active">
        <img
          src={`http://127.0.0.1:8000/images/${post.image}`}
          class="d-block w-100"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block ">
          <h5 className="text-primary fw-bold">{post.title}</h5>
          <p>{post.content}</p>
        </div>
      </div>
    );
})}

            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <br />
          <div className="container mt-5">
            <div className="row row-cols-3 d-flex flex-wrap">
              {data.map((post) => {
                return (
                  <div className="col mt-4" key={post.id}>
                    <div class="card h-100">
                      <img
                        src={`http://127.0.0.1:8000/images/${post.image}`}
                        class="card-img-top"
                        height="250px"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title fw-bold">{post.title}</h5>
                        <p class="card-text">{post.content}</p>
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
