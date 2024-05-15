import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/postSlice';
import { useModal } from '../../context/Modal';

function UpdatePost({ post }) {
  const { id } = post;
  const [photo, setPhoto] = useState(post.photo || '');
  const [context, setContext] = useState(post.context || '');
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePost({ id, photo, context }));
    closeModal();
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo url"
        />
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Whats on your mind?"
        ></textarea>
        <button className="btn update-btn" onClick={handleUpdate}>
          Update Post
        </button>
      </div>
    </>
  );
}

export default UpdatePost;
