import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/postSlice';

function CreatePost() {
  const [photo, setPhoto] = useState('');
  const [context, setContext] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ photo, context }));
    setContext('');
    setPhoto('');
  };
  return (
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
          placeholder="What's on your mind?"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        ></textarea>
      </label>
      <button className="btn success-btn" type="submit">
        Create New Post
      </button>
    </form>
  );
}

export default CreatePost;
