import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Homepage() {
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!sessionUser) return <h1>Loading....</h1>;
  return (
    <div>
      <h1>Welcome to the homepage</h1>
    </div>
  );
}

export default Homepage;
