import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchExploreUsers } from '../../store/userSlice';
import { fetchExplorePost } from '../../store/postSlice';
import UserPost from '../Homepage/UserPost';
import styles from './ExplorePage.module.css';

function ExlorePage() {
  const usersPost = useSelector((state) => state.posts);
  const posts = Object.values(usersPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExploreUsers());
    dispatch(fetchExplorePost());
  }, [dispatch]);

  if (usersPost.post === null) return <h1>Loading</h1>;

  return (
    <div id={styles.exploreFeed}>
      <h1>Explore</h1>
      <div className={styles.postFeed}>
        {posts.map((post) => (
          <UserPost post={post} userId={post.userId} key={post.id} />
        ))}
      </div>
    </div>
  );
}

export default ExlorePage;