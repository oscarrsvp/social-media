import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CommentSection from './CommentSection';
import DeletePost from '../PostForm/DeletePost';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdatePost from '../UpdateInputs/UpdatePost';
import PostDetails from './PostDetails';
import styles from './Homepage.module.css';

function UserPost({ post, userId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);

  if (users.users === null) return <h1>Loading</h1>;

  const fullName = `${users[userId].firstName} ${users[userId].lastName}`;

  return (
    <>
      <div className={styles.userPost}>
        <div className="flexBetween p-16">
          <div className="flexBetween">
            <p className={styles.userImage}></p>
            <h3>{fullName}</h3>
          </div>
          <BsThreeDotsVertical cursor={'pointer'} size={20} />
        </div>

        <div className={styles.postDetails}>
          <PostDetails post={post} fullName={fullName} />
          <CommentSection post={post} comments={post.Comments} />
          <div>
            {sessionUser.id === post.userId && (
              <>
                <DeletePost postId={post.id} userId={post.userId} />
                <OpenModalButton
                  buttonText="Update Button"
                  modalComponent={<UpdatePost post={post} />}
                  classNames={'btn update-btn'}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPost;
