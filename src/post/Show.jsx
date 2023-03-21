import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Ghost from "./../images/Ghosty.gif";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = React.useState(true);
 const [comments, setComments] = useState([]);
 const [users, setUsers] = useState([]);



  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/post/show/${id}`
        );

        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setPost(data.data);
      } catch (error) {
        console.log(error);
      }
    };




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

    const getUser = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/v1/dashboard/admin/user');
        setUsers(data.data.data);
      } catch (error) {
        console.log(error)
        
      }
    }



    getUser();

    getPost();
    getComments();
  }, [id]);

  return (
    <>
      {loading ? (
        <img src={Ghost} alt="" className="m-auto" srcset="" />
      ) : (
        <>
        {/* post  detail */}
          <div className="block max-w-sm p-10 m-auto mt-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             {post.title}
            </h5>
            <span className="text-white inline-block mt-2 font-serif">👁️ {post.views}</span>
            <p className="font-normal text-gray-700 dark:text-gray-400 mt-3 font-mono">
            {post.content}
            </p>
          </div>

<h2 className="mt-9 text-center font-semibold font-mono">Commentar</h2>

{/* end post detail */}

{/* commentar */}
{comments.map(comment => {

  const user = users.find(user => user.id === comment.user_id);

  return (
    <>
<div class="flex justify-center pt-4">
  <div
    class="block max-w-sm rounded-lg bg-slate-800 p-6 shadow-lg ">
    <h5
      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
     {user.name}
    </h5>
    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
     {comment.content}
    </p>
    
  </div>
</div>
</>
  )

})}


  

{/* end commentar */}


        </>
      )}
    </>
  );
};

export default Post;
