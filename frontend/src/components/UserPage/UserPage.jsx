import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { SlUser } from 'react-icons/sl';
import { fetchUser } from '../../store/userSlice';
import { fetchUserPosts, clearPosts } from '../../store/postSlice';
import { featureComingSoon } from '../../utils/globallyFns';
import UserPost from '../Homepage/UserPost';
import styles from './UserPage.module.css';

function UserPage() {
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[userId]);
  const posts = useSelector((state) => state.posts);
  const userPost = Object.values(posts);
  const dispatch = useDispatch();

  const postByDate = userPost.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchUser(userId));
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!user || posts.post === null) return <h1>Loading...</h1>;

  return (
    <div id={styles.userPage}>
      <div className={styles.userContainer}>
        <div className={styles.imgContainer}>
          <img
            src={user ? user.headerImage : ''}
            alt=""
            style={{ width: '100%', height: '250px' }}
          />
        </div>
        <div className={styles.userFeed}>
          <div className={styles.userCard}>
            <div className={styles.userActions}>
              <div>
                {user.profileImage ? (
                  <img src={user.profileImage} alt="" className={styles.profileImg} />
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
                <button onClick={(e) => featureComingSoon(e)} className="btn">
                  Follow
                </button>
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
            {userPost.length > 0
              ? postByDate.map((post) => (
                  <UserPost post={post} userId={userId} key={post.id} />
                ))
              : 'No Posts'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
