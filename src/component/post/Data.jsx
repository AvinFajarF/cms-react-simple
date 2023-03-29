import React, { useEffect, useState } from "react";
import axios from "axios";
import Ghost from "./../../images/Ghosty.gif";
import Table from 'react-bootstrap/Table';
//import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Content</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
                      {data.map((item) => (
                        <tr
                          key={item.id}
                        >
                          <td>
                            {item.id}
                          </td>
                          <td>
                            {item.title}
                          </td>
                          <td>
                            {item.content}
                          </td>
                          <td>
                          <a href={`/posts/${item.id}`}>Show</a>
                          </td>
                        </tr>
                      ))}
      </tbody>
    </Table>
      )}
    </>
  );
}

export default App;
