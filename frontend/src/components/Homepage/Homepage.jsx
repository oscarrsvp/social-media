import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchPosts, createPost, deletePost } from '../../store/postSlice';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdatePost from '../UpdateInputs/UpdatePost';
import UserPost from './UserPost';
import styles from './Homepage.module.css';

function Homepage() {
  const [photo, setPhoto] = useState('');
  const [context, setContext] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ photo, context }));
  };

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div id={styles.homePage}>
      <div className={styles.sideBar}>
        SIDEBAR
        <div>News Feed</div>
        <div>Explore -- This will be a link</div>
        <div>Message -- Link to chat page</div>
      </div>
      <div className={styles.feedContainer}>
        {/* <div>HEADERS</div> */}
        <div className={styles.feed}>
          <h2>POST DETAILS</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                placeholder="Photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
            <label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
              ></textarea>
            </label>
            <button type="submit">Create New Post</button>
          </form>
          <UserPost />
        </div>
      </div>
      <div style={{ backgroundColor: '#8ecae6' }}>
        <h2>FOLLOWERS/FOLLOWING</h2>
      </div>

      {/* {currentUser && (
        <>
          <button onClick={() => dispatch(deletePost(post?.id))}>Delete Post</button>
          <OpenModalButton
            buttonText="Update Button"
            modalComponent={<UpdatePost post={post} />}
          />
        </>
      )} */}
    </div>
  );
}

export default Homepage;
