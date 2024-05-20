import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SlUser } from 'react-icons/sl';
import { createPost } from '../../store/postSlice';
import styles from './Post.module.css';

function CreatePost() {
  const [photo, setPhoto] = useState('');
  const [context, setContext] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const fullName = `${sessionUser.firstName || ''} ${sessionUser.lastName || ''}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ photo, context }));
    setContext('');
    setPhoto('');
  };
  return (
    <div className={styles.createPost}>
      <div className={styles.userDetails}>
        {sessionUser.profileImage ? (
          <img src={sessionUser.profileImage} alt="" className={styles.profileImg} />
        ) : (
          <SlUser size={20} />
        )}
        <h3>{fullName}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            placeholder="What's on your mind?"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          ></textarea>
        </label>

        <label>
          <input
            type="text"
            placeholder="Photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </label>
        <button className="btn success-btn" type="submit">
          Share Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
