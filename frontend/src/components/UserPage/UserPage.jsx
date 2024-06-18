import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchUser, fetchFollowing } from '../../store/userSlice';
import { fetchUserPosts, clearPosts } from '../../store/postSlice';
import ImageHeader from './ImageHeader';
import UserCard from './UserCard';
import UserDetails from './UserDetails';
import CreatePost from '../PostForm/CreatePost';
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
    dispatch(fetchFollowing(userId));
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!user || posts.post === null) return <h1>Loading...</h1>;

  return (
    <div id={styles.userPage}>
      <div className={styles.userContainer}>
        <ImageHeader sessionUserId={sessionUser.id} user={user} />

        <div className={styles.userFeed}>
          <div className={styles.userCard}>
            <UserCard user={user} />

            <UserDetails user={user} />
          </div>

          <div className={styles.feed}>
            {sessionUser.id === user.id && (
              <>
                <CreatePost />
              </>
            )}
            {userPost.length > 0 ? (
              postByDate.map((post) => (
                <UserPost post={post} userId={userId} key={post.id} />
              ))
            ) : (
              <>
                {sessionUser.id === user.id && (
                  <>
                    <CreatePost />
                  </>
                )}
                <h1>User doesn&apos;t have any post</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
