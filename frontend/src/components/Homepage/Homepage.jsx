import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchPosts } from '../../store/postSlice';
import { fetchUsers } from '../../store/userSlice';
import CreatePost from '../PostForm/CreatePost';
import UserPost from './UserPost';
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

  if (posts.post === null) return <h1>Loading</h1>;

  return (
    <div id={styles.homePage}>
      <div className={styles.feed}>
        <CreatePost />
        {postByDate.map((post) => (
          <UserPost post={post} userId={post.userId} key={post.id} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
        <div style={{ backgroundColor: '#003049', height: '300px', marginRight: '20px' }}>
          <div>
            <h2>FOLLOWERS/FOLLOWING</h2>
          </div>
          <div>
            <h4>Who to Follow</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
