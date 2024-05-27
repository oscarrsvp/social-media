import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../store/commentSlice';
import DisplayName from '../Homepage/DisplayName';
import { useModal } from '../../context/Modal';

function UpdateComment({ comment }) {
  const { id } = comment;
  const [context, setContext] = useState(comment?.context || '');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleUpdate = () => {
    const editComment = dispatch(updateComment({ id, context }));

    return editComment.then(async (res) => {
      const data = await res;
      if (data.error) {
        setErrors(data.payload);
      } else {
        setContext('');
        closeModal();
      }
    });
  };

  return (
    <>
      <div>
        <h2>Edit Comment</h2>
        <DisplayName />
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Whats on your mind?"
        ></textarea>
        {errors.context && <p className="error">{errors.context}</p>}
        <button className="btn update-btn" onClick={handleUpdate}>
          Update Comment
        </button>
      </div>
    </>
  );
}

export default UpdateComment;
