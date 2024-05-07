import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchPosts, createPost, deletePost } from '../../store/postSlice';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdatePost from '../UpdatePost/UpdatePost';
import styles from './Homepage.module.css';

function Homepage() {
  const [photo, setPhoto] = useState('');
  const [context, setContext] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = useSelector((state) => state.posts);
  const posts = Object.values(allPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ photo, context }));
  };

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!sessionUser) return <h1>Loading....</h1>;

  return (
    <div id={styles.homePage}>
      {/* <h1>Welcome to the homepage</h1> */}
      <div className={styles.sideBar}>SIDEBAR</div>
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
          {posts.map((post) => (
            <div key={post?.id + 2}>
              <img src={post?.photo} style={{ width: '200px', height: '200px' }} />
              <p>{post?.context}</p>
              {sessionUser?.id === post?.userId && (
                <>
                  <button onClick={() => dispatch(deletePost(post?.id))}>
                    Delete Post
                  </button>
                  <OpenModalButton
                    buttonText="Update Button"
                    modalComponent={<UpdatePost post={post} />}
                  />
                </>
              )}

              {/* <OpenModalButton
                buttonText="Update Button"
                modalComponent={<UpdatePost id={post?.id} />}
              /> */}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>FOLLOWERS/FOLLOWING</h2>
      </div>
    </div>
  );
}

export default Homepage;
