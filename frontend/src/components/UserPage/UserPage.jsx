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
  const [viewDisplay, SetViewDisplay] = useState('Standard');
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
    return setSelectedTab('Post');
  }, [dispatch, userId]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!user || posts.post === null) return <h1>Loading...</h1>;

  return (
    <div id={styles.userPage}>
      <div className={styles.userContainer}>
        <div className={styles.userHeader}>
          <ImageHeader sessionUserId={sessionUser.id} user={user} />

          <UserCard user={user} />

          <ActionBar
            onSelectTab={setSelectedTab}
            isMobile={isMobile}
            SetViewDisplay={SetViewDisplay}
          />
        </div>

        <div className={styles.userFeed}>
          <div className={styles.feed}>
            {sessionUser.id === user.id && selectedTab === 'Post' && <CreatePost />}

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

            {!isMobile && selectedTab === 'Post' ? (
              userPost.length > 0 ? (
                <div className={styles.gridMode}>
                  {postByDate.map((post) => (
                    <UserPost
                      post={post}
                      userId={userId}
                      key={post.id}
                      viewDisplay={viewDisplay}
                    />
                  ))}
                </div>
              ) : (
                <h1>
                  {sessionUser.id === user.id
                    ? "You don't have any posts"
                    : `${user.firstName} doesn't have any posts`}
                </h1>
              )
            ) : (
              !isMobile && selectedTab === 'Photos' && <UserPhotos />
            )}
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
