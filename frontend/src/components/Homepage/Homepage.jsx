import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchPosts } from '../../store/postSlice';
import { fetchUsers } from '../../store/userSlice';
import CreatePost from '../PostForm/CreatePost';
import UserPost from './UserPost';
import FollowingSection from '../FollowingSection/FollowingSection';
import AdsContent from '../AdsContent/AdsContent';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import styles from './Homepage.module.css';

function Homepage() {
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(true);
  const userPost = Object.values(posts);
  const dispatch = useDispatch();

  const postByDate = userPost.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers()).then(() => setIsLoading(false));
  }, [dispatch]);

  const heightDimension = userPost.length === 0 ? styles.pageHeightNoPost : '';

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (posts.post === null)
    return (
      isLoading && (
        <div className={styles.feed}>
          <SkeletonCard length={4} />
        </div>
      )
    );

  return (
    <div id={styles.homePage} className={heightDimension}>
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
