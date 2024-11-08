import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchPosts } from '../../store/postSlice';
import { fetchUsers } from '../../store/userSlice';
import CreatePost from '../PostForm/CreatePost';
import UserPost from './UserPost';
import FollowingSection from '../FollowingSection/FollowingSection';
import AdsContent from '../AdsContent/AdsContent';
import styles from './Homepage.module.css';

function Homepage() {
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);
  const userPost = Object.values(posts);
  const dispatch = useDispatch();

  const postByDate = userPost.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (posts.post === null) return <h1>Loading...</h1>;

  return (
    <div id={styles.homePage}>
      <div className={styles.feed}>
        <CreatePost />
        {userPost.length === 0 ? (
          <h1>No posts to display. Create your first post now!</h1>
        ) : null}
        {postByDate.map((post) => (
          <UserPost post={post} userId={post.userId} key={post.id} />
        ))}
      </div>

      <div className={styles.SidebarR}>
        <FollowingSection userId={sessionUser.id} />
        <AdsContent />
      </div>
    </div>
  );
}

export default Homepage;
