import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/postSlice';
import DisplayName from '../Homepage/DisplayName';
import { validateImage } from '../../utils/globallyFns';
import { useModal } from '../../context/Modal';

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
      if (photo) {
        if (!validateImage(photo)) {
          setErrors({ photo: 'Image format is invalid' });
          return;
        }
      }

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
      <div>
        <h2>Edit Post</h2>
        <DisplayName />
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo url"
        />
        {errors.photo && <p className="error">{errors.photo}</p>}
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Whats on your mind?"
        ></textarea>
        {errors.context && <p className="error">{errors.context}</p>}
        <button className="btn update-btn" onClick={handleUpdate}>
          Update Post
        </button>
      </div>
    </>
  );
}

export default UpdatePost;
