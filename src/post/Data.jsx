import React, { useEffect, useState } from "react";
import axios from "axios";
import Ghost from "./../images/Ghosty.gif";

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
        <div className="container m-auto">
          <h3 className="mt-10 font-mono text-center text-3xl">List Blog</h3>

          <div className="flex flex-col transition mt-40">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Deacription
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {item.id}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.title}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {item.content}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-blue-700 hover:text-blue-400">
                          <a href={`/posts/${item.id}`}>Show</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
