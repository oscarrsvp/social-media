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
  const posts = Object.values(allPosts).reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const createdAt = (date) => {
    const getDate = new Date(date);
    const dates = getDate.toLocaleString('default', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return dates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ photo, context }));
  };

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  if (!sessionUser) return <h1>Loading....</h1>;

  return (
    <div id={styles.homePage}>
      {/* <h1>Welcome to the homepage</h1> */}
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
          {posts.map((post) => (
            <div className={styles.userPost} key={`${post?.id}`}>
              <div>
                <h2>User&apos;s Img</h2>
                <h3>
                  {post?.User?.firstName} {post?.User?.lastName}
                </h3>
                <h4>{createdAt(post?.createdAt)}</h4>
              </div>
              <div>
                <img src={post?.photo} />
                <p>{post?.context}</p>
                {sessionUser?.id === post?.userId ? (
                  <>
                    <button onClick={() => dispatch(deletePost(post?.id))}>
                      Delete Post
                    </button>
                    <OpenModalButton
                      buttonText="Update Button"
                      modalComponent={<UpdatePost post={post} />}
                    />
                  </>
                ) : (
                  <>
                    <button>Like</button>
                    <button>Comment</button>
                  </>
                )}

                {/* <OpenModalButton
                buttonText="Update Button"
                modalComponent={<UpdatePost id={post?.id} />}
              /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ backgroundColor: 'red' }}>
        <h2>FOLLOWERS/FOLLOWING</h2>
      </div>
    </div>
  );
}

export default Homepage;
