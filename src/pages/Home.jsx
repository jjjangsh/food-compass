import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/postdetail?id=3">디테일페이지</Link>
    </div>
  );
};

export default Home;
