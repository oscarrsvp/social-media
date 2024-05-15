import { useSelector } from 'react-redux';

function DisplayName() {
  const sessionUser = useSelector((state) => state.session.user);
  const fullName = `${sessionUser.firstName} ${sessionUser.lastName}`;

  return <h3>{fullName}</h3>;
}

export default DisplayName;
