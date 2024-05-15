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
  const fullName = `${sessionUser.firstName} ${sessionUser.lastName}`;

  useEffect(() => {
    dispatch(fetchPosts());

    dispatch(fetchUsers());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (posts.post === null) return <h1>Loading</h1>;

  return (
    <div id={styles.homePage}>
      <div className={styles.sideBar}>
        SIDEBAR
        <div>News Feed</div>
        <div>Explore -- This will be a link</div>
        <div>Message -- Link to chat page</div>
      </div>
      <div className={styles.feedContainer}>
        <div className={styles.feed}>
          <h2>Welcome, {fullName}</h2>
          <CreatePost />
          {userPost.map((post) => (
            <UserPost post={post} userId={post.userId} key={post.id} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
        <div style={{ backgroundColor: '#003049', height: '300px', marginRight: '20px' }}>
          <h3>{fullName}&apos;s Followers</h3>
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
