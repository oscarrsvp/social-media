import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../store/commentSlice';
import { useModal } from '../../context/Modal';

function UpdateComment({ comment }) {
  const { id } = comment;
  const [context, setContext] = useState(comment?.context || '');
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateComment({ id, context }));
    closeModal();
  };

  return (
    <>
      <div>
        <input
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Whats on your mind?"
        ></input>
        <button className="btn update-btn" onClick={handleUpdate}>
          Update Comment
        </button>
      </div>
    </>
  );
}

export default UpdateComment;
