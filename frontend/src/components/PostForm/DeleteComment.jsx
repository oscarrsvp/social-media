import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { VscChromeClose } from 'react-icons/vsc';
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
          <VscChromeClose onClick={closeModal} />
          <div>
            <h2>You are about to delete a comment</h2>
            <p>
              Are you sure you want to delete this comment? This action cannot be undone.
            </p>
          </div>

          <div className="deleteActions">
            <button className="btn" onClick={closeModal}>
              No, cancel
            </button>

            <button className="btn delete-btn" onClick={handleDelete}>
              Yes, I&apos;m sure
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteComment;
