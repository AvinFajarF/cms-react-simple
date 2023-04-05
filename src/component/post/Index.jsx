import React, { useEffect, useState } from "react";
import axios from "axios";
import Ghost from "./../../images/Ghosty.gif";
//import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// import css
import "./css/Data.css";
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const imgPath = "http://127.0.0.1:8000/images/";

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
          <h1 className="blog-title">Writing from our team</h1>
          <p className="descripsi">develop react js and laravel api</p>

          {/* card */}

          <Container>
            <Row xs={1} md={2} lg={3}>
              {data.map((post) => (
                <Col key={post.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={imgPath + `${post.image}`} />
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>
                       {post.content}
                      </Card.Text>
                     <Link to={`/posts/${post.id}`}>Detail</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
