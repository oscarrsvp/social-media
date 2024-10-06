import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { featureComingSoon } from '../../utils/globallyFns';
import CommentSection from './CommentSection';
import DeletePost from '../PostForm/DeletePost';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdatePost from '../UpdateInputs/UpdatePost';
import PostDetails from './PostDetails';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './Homepage.module.css';

function UserPost({ post, userId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);

  if (!users) return <h1>Loading</h1>;

  const fullName = users
    ? `${users[userId]?.firstName || ''} ${users[userId]?.lastName || ''}`
    : '';

  return (
    <>
      <div className={styles.userPost}>
        <div className={`flexBetween p-16 ${styles.userHeading}`}>
          <div className="flexBetween">
            <p className={styles.userImage}>
              {users[userId]?.profileImage ? (
                <img src={users[userId].profileImage} alt="" />
              ) : (
                <img src={BlankImage} />
              )}
            </p>

            <Link to={`/user/${users[userId]?.id}`}>{fullName}</Link>
          </div>
          <BsThreeDotsVertical
            cursor={'pointer'}
            size={20}
            onClick={(e) => featureComingSoon(e)}
          />
        </div>

        <div className={styles.postDetails}>
          <PostDetails post={post} fullName={fullName} />
          <CommentSection postId={post.id} postLikes={post.likes} />
          {sessionUser.id === post.userId && (
            <div>
              <div>
                <OpenModalButton
                  buttonText="Update Post"
                  modalComponent={<UpdatePost post={post} />}
                  classNames={'btn update-btn'}
                />
                <OpenModalButton
                  buttonText="Delete Post"
                  modalComponent={<DeletePost postId={post.id} userId={post.userId} />}
                  classNames={'btn delete-btn'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPost;
