import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CommentSection from './CommentSection';
import styles from './Homepage.module.css';

function UserPost() {
  const post = useSelector((state) => state.posts);
  const userPost = Object.values(post).reverse();

  const createdAt = (date) => {
    const getDate = new Date(date);
    const dates = getDate.toLocaleString('default', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return dates;
  };

  if (userPost[0] === null) return null;

  return (
    <>
      {userPost.map((user) => (
        <div className={styles.userPost} key={user.id}>
          <div className="flexBetween p-16">
            <div className="flexBetween">
              <p className={styles.userImage}></p>
              <h3>
                {user.User.firstName} {user.User.lastName}
              </h3>
            </div>
            <BsThreeDotsVertical cursor={'pointer'} size={20} />
          </div>

          <img src={user.photo} />

          <div className={styles.postDetails}>
            <div>
              <p>
                <span>
                  {user.User.firstName} {user.User.lastName}
                </span>
                {user.context}
              </p>
            </div>

            <h5>Posted: {createdAt(user.createdAt)}</h5>

            <div>
              <CommentSection post={user} comments={user.Comments} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserPost;
