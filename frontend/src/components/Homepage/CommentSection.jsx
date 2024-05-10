import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createComment, deleteComment } from '../../store/commentSlice';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdateComment from '../UpdateInputs/UpdateComment';

function CommentSection({ post, comments }) {
  const postId = post.id;
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleComment = () => {
    if (comment.length === 0) return alert('Please provide a value');

    dispatch(createComment({ context: comment, postId }));
    setComment('');
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />

        <button>Like</button>
        <button onClick={handleComment}>Comment</button>
      </div>
      <button onClick={() => setShowComments(!showComments)}>
        {!showComments ? 'View Comments' : 'Hide Comments'}
      </button>

      {showComments && (
        <div>
          {comments.map((comment) => (
            <div key={comment?.id}>
              <p>{comment?.context}</p>
              {sessionUser.id === comment?.userId && (
                <div>
                  <OpenModalButton
                    buttonText="Edit Comment"
                    modalComponent={<UpdateComment comment={comment} />}
                  />
                  <button
                    onClick={() => dispatch(deleteComment({ postId, id: comment?.id }))}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
