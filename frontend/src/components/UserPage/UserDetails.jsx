import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/globallyFns';
import { featureComingSoon } from '../../utils/globallyFns';
import UpdateUserDetails from '../UpdateInputs/UpdateUserDetails';
import styles from './UserPage.module.css';

function UserDetails({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [update, setUpdate] = useState(false);

  return (
    <div className={styles.userSection}>
      {update ? (
        <UpdateUserDetails user={user} update={setUpdate} />
      ) : (
        <>
          <div className={styles.userInfo}>
            <p>
              Relationship Status:{' '}
              {user.relationship ? <strong>{user.relationship}</strong> : 'N/A'}
            </p>
            <p>City: {user.city ? <strong>{user.city}</strong> : 'N/A'}</p>
            <p>Gender: {user.gender ? <strong>{user.gender}</strong> : 'N/A'}</p>
            <p>
              Birthday:{' '}
              <strong>{user.birthday ? formatDate(user.birthday) : 'N/A'}</strong>
            </p>
          </div>

          {sessionUser.id === user.id ? (
            <>
              <button className="btn" onClick={(e) => featureComingSoon(e)}>
                Update Information
              </button>
              {/* <button className="btn update-btn" onClick={() => setUpdate(!update)}>
                Update Information
              </button> */}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default UserDetails;
