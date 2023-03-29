import Card from 'react-bootstrap/Card';

function Home() {
  return (
    <Card style={{ width: '18rem' }} className="m-auto mt-5" border='success'>
      <Card.Body>
        <Card.Title style={{fontFamily: 'serif', fontWeight: 'bold'}} className="text-center">React cms simple</Card.Title>
        <Card.Text>
            <img src="https://indoittraining.com/wp-content/uploads/sites/3/2020/11/reactjs.png" className='w-75 mt-4' alt="" srcset="" />
          <p className='mt-4'>This is website Develop use React Js and Laravel 9 api shanctum</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Home;