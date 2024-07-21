import BlankImage from '../../assets/blank-profile-picture.png';
import { useSelector } from 'react-redux';

function DisplayName() {
  const sessionUser = useSelector((state) => state.session.user);
  const fullName = `${sessionUser.firstName} ${sessionUser.lastName}`;

  return (
    <div className="center m-8">
      {sessionUser.profileImage ? (
        <img className="profileImg" src={sessionUser.profileImage} alt="user-image" />
      ) : (
        <img src={BlankImage} className="profileImg" />
      )}

      <h3>{fullName}</h3>
    </div>
  );
}

export default DisplayName;
