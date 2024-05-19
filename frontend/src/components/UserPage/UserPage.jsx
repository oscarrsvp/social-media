import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { SlUser } from 'react-icons/sl';
import { fetchUser } from '../../store/userSlice';
import UserPost from '../Homepage/UserPost';
import styles from './UserPage.module.css';

function UserPage() {
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!user) return <h1>Loading...</h1>;

  return (
    <div id={styles.userPage}>
      <div className={styles.sideBar}>
        SIDEBAR
        <div>My Feed -- Back to /homepage</div>
        <div>Explore -- This will be a link</div>
        <div>Message -- Link to chat page</div>
      </div>

      <div className={styles.userContainer}>
        <div className={styles.imgContainer}>
          <img
            src={user.UserPhotos.length > 0 ? user.UserPhotos[0].url : ''}
            alt=""
            style={{ width: '100%', height: '250px' }}
          />
        </div>
        <div className={styles.userFeed}>
          <div className={styles.userCard}>
            <div className={styles.userActions}>
              <div>
                {user?.UserPhotos.length > 0 ? (
                  <img
                    src={user.UserPhotos[0].url}
                    alt=""
                    className={styles.profileImg}
                  />
                ) : (
                  <SlUser size={120} />
                )}
              </div>
              <div>
                <h2>{`${user?.firstName} ${user?.lastName}`}</h2>
                <p>Message</p>
                <p>Photos</p>
              </div>

              <div>
                <button className="btn">Follow</button>
              </div>
            </div>

            <div className={styles.userSection}>
              <p>Relationship Status: {user?.relationship}</p>
              {user?.city ? <p>City: {user?.city}</p> : null}
              <p>Gender: {user?.gender}</p>
              <p>Birthday: {user?.birthday}</p>
            </div>
          </div>

          <div className={styles.feed}>
            {user.Posts &&
              user?.Posts.map((post) => (
                <UserPost post={post} userId={userId} key={post.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
