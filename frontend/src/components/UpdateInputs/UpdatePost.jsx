import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/postSlice';
import { useModal } from '../../context/Modal';
import { VscChromeClose } from 'react-icons/vsc';
import DisplayName from '../Homepage/DisplayName';
import styles from './UpdateInputs.module.css';

function UpdatePost({ post }) {
  const { id } = post;
  const [photo, setPhoto] = useState(post.photo || '');
  const [context, setContext] = useState(post.context || '');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleUpdate = () => {
    try {
      setErrors({});

      const editPost = dispatch(updatePost({ id, photo, context }));

      return editPost.then(async (res) => {
        const data = await res;
        if (data.error) {
          setErrors(data.payload);
        } else {
          setPhoto('');
          setContext('');
          closeModal();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={`${styles.header} p-15 border-line`}>
        <DisplayName />
        <VscChromeClose onClick={closeModal} />
      </div>

      <div className="p-15">
        {photo && <img src={photo} alt="" className={styles.imagePost} />}

        <div>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Whats on your mind?"
            autoFocus
          ></textarea>
          {errors.context && <p className="error">{errors.context}</p>}
          <button className="btn update-btn" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdatePost;
