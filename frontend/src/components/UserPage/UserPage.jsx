import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchUser } from '../../store/userSlice';
import { fetchUserPosts, clearPosts } from '../../store/postSlice';
import { fetchFollowing } from '../../store/followSlice';
import { fetchUsersPhotos } from '../../store/userPhotosSlice';
import ImageHeader from './ImageHeader';
import UserCard from './UserCard';
import UserDetails from './UserDetails';
import CreatePost from '../PostForm/CreatePost';
import UserPost from '../Homepage/UserPost';
import AdsContent from '../AdsContent/AdsContent';
import ActionBar from './ActionBar';
import UserPhotos from '../UserPhotos/UserPhotos';
import { MobileContext } from '../../App';
import styles from './UserPage.module.css';

function UserPage() {
  const { userId } = useParams();
  const [selectedTab, setSelectedTab] = useState('Post');
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[userId]);
  const posts = useSelector((state) => state.posts);
  const userPost = Object.values(posts);
  const isMobile = useContext(MobileContext);
  const dispatch = useDispatch();

  const postByDate = userPost.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchUser(userId));
    dispatch(fetchUserPosts(userId));
    dispatch(fetchFollowing());
    dispatch(fetchUsersPhotos(userId));
  }, [dispatch, userId]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!user || posts.post === null) return <h1>Loading...</h1>;

  return (
    <div id={styles.userPage}>
      <div className={styles.userContainer}>
        <div className={styles.userHeader}>
          <ImageHeader sessionUserId={sessionUser.id} user={user} />
          <UserCard user={user} />
          {isMobile && <ActionBar onSelectTab={setSelectedTab} />}
        </div>

        <div className={styles.userFeed}>
          <div className={styles.feed}>
            {sessionUser.id === user.id && <CreatePost />}

            {isMobile && selectedTab === 'Post' ? (
              <>
                {userPost.length > 0 ? (
                  postByDate.map((post) => (
                    <UserPost post={post} userId={userId} key={post.id} />
                  ))
                ) : (
                  <h1 className="noContent">
                    {sessionUser.id === user.id
                      ? "You don't have any posts"
                      : `${user.firstName} doesn't have any posts`}
                  </h1>
                )}
              </>
            ) : isMobile && selectedTab === 'About' ? (
              <div className={styles.userCard}>
                <UserDetails user={user} />
              </div>
            ) : (
              isMobile && selectedTab === 'Photos' && <UserPhotos />
            )}

            {!isMobile &&
              (userPost.length > 0 ? (
                postByDate.map((post) => (
                  <UserPost post={post} userId={userId} key={post.id} />
                ))
              ) : (
                <h1>
                  {sessionUser.id === user.id
                    ? "You don't have any posts"
                    : `${user.firstName} doesn't have any posts`}
                </h1>
              ))}
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className={styles.userCard}>
          <UserDetails user={user} />
          <AdsContent />
        </div>
      )}
    </div>
  );
}

export default UserPage;
