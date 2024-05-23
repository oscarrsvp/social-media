import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteComment } from '../../store/commentSlice';

function DeleteComment({ commentId, postId, userId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment({ id: commentId, postId }));
    closeModal();
  };

  return (
    <>
      {sessionUser.id === userId && (
        <div className={`deleteModal`}>
          <h1>Confirm Delete?</h1>
          <p>Are you sure you want to delete this comment?</p>

          <button className="btn delete-btn" onClick={handleDelete}>
            Yes (Delete Comment)
          </button>

          <button className="btn" onClick={closeModal}>
            No (Keep Comment)
          </button>
        </div>
      )}
    </>
  );
}

export default DeleteComment;
