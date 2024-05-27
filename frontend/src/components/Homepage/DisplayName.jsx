import { useSelector } from 'react-redux';

function DisplayName() {
  const sessionUser = useSelector((state) => state.session.user);
  const fullName = `${sessionUser.firstName} ${sessionUser.lastName}`;

  return (
    <div className="center m-8">
      <img className="profileImg" src={sessionUser.profileImage} alt="user-image" />
      <h3>{fullName}</h3>
    </div>
  );
}

export default DisplayName;
