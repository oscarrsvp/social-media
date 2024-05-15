import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/postSlice';

function DeletePost({ postId, userId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  return (
    <>
      {sessionUser.id === userId && (
        <button className="btn delete-btn" onClick={() => dispatch(deletePost(postId))}>
          Delete Post
        </button>
      )}
    </>
  );
}

export default DeletePost;
