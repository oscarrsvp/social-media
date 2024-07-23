import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/globallyFns';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdateUserDetails from '../UpdateInputs/UpdateUserDetails';
import styles from './UserPage.module.css';

function UserDetails({ user }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className={styles.userSection}>
      <h3>{user.firstName}&apos;s details</h3>
      <>
        <div className={styles.userInfo}>
          <p>
            Relationship Status:{' '}
            {user.relationship ? <strong>{user.relationship}</strong> : 'N/A'}
          </p>
          <p>City: {user.city ? <strong>{user.city}</strong> : 'N/A'}</p>
          <p>Gender: {user.gender ? <strong>{user.gender}</strong> : 'N/A'}</p>
        </div>

        <span>
          Memeber Since:{' '}
          <strong>{user.createdAt ? formatDate(user.createdAt) : null} </strong>{' '}
        </span>

        {sessionUser.id === user.id ? (
          <>
            <OpenModalButton
              buttonText="Update Information"
              modalComponent={<UpdateUserDetails user={user} />}
              classNames={'btn'}
            />
          </>
        ) : null}
      </>
    </div>
  );
}

export default UserDetails;
