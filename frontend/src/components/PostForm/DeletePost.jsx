import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
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
          <h1>Confirm Delete?</h1>
          <p>Are you sure you want to delete this post?</p>

          <button className="btn delete-btn" onClick={handleDelete}>
            Delete Post
          </button>

          <button className="btn" onClick={closeModal}>
            No (Keep Post)
          </button>
        </div>
      )}
    </>
  );
}

export default DeletePost;
