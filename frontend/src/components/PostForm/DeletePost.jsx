import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { VscChromeClose } from 'react-icons/vsc';
import { deletePost } from '../../store/postSlice';

function DeletePost({ postId, userId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(postId));
    closeModal();
  };

  return (
    <>
      {sessionUser.id === userId && (
        <div className="deleteModal">
          <VscChromeClose onClick={closeModal} />
          <div>
            <h2>You are about to delete a post</h2>
            <p>
              Are you sure you want to delete this post? This action cannot be undone.
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

export default DeletePost;
