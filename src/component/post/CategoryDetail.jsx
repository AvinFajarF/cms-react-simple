import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryDetail() {
  const { id } = useParams();
  const [categoryFind, setCategoryFind] = useState([]);
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([])
  const [postFind, setPostFind] = useState([])

  useEffect(() => {
    const getCategorysDetail = async (id) => {
      try {
        let res = await axios.get(
          `http://127.0.0.1:8000/api/v1/category/${id}/post`
        );
        setPostFind(res.data.data.post_id);
        setCategoryFind(res.data.data.category_id);
      } catch (error) {
        console.log(error);
      }
    };

    const getPost = async () => {
      await axios
        .get("http://localhost:8000/sanctum/csrf-cookie")
        .then(async () => {
          await axios.get("http://localhost:8000/api/v1/post").then((res) => {
            setPost(res.data.data.data);
          });
        });
    };

    const getAllCategory = async () => {

      await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        await axios.get("http://localhost:8000/api/v1/category").then((res) => {
          setCategory(res.data.data);
        });
      });

    }

    getAllCategory()
    getCategorysDetail(id);
    getPost();
  }, []);

  console.log(categoryFind);


  return (
    <>
      <div className="container">
        <div className="row">
          {category.filter((categorys) => categorys.id == categoryFind).map((res) => {
            return (
              <div className="p-4 text-center">
              <h1 className=" fw-bold display-2">{res.name}</h1>
              </div>
            )
          })}
          {/* {categoryFind.map((tag) => {
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
                     
                    </div>
                  </div>
                </div>
              </>
            );
          })} */}

          {post
            .filter((post) => post.id === postFind)
            .map((dataPost) => {
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

export default CategoryDetail;
