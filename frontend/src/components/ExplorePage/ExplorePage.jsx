import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchExploreUsers } from '../../store/userSlice';
import { fetchExplorePost, clearPosts } from '../../store/postSlice';
import UserPost from '../Homepage/UserPost';
import AdsContent from '../AdsContent/AdsContent';
import styles from './ExplorePage.module.css';

function ExlorePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const usersPost = useSelector((state) => state.posts);
  const posts = Object.values(usersPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchExploreUsers());
    dispatch(fetchExplorePost());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (usersPost.post === null) return <h1>Loading</h1>;

  return (
    <>
      <div id={styles.exploreFeed}>
        <div className={styles.postFeed}>
          {posts.map((post) => (
            <UserPost post={post} userId={post.userId} key={post.id} />
          ))}
        </div>
        <div>
          <AdsContent />
        </div>
      </div>
    </>
  );
}

export default ExlorePage;
