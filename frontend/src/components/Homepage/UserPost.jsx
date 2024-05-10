import { useSelector } from 'react-redux';
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
    });

    return dates;
  };

  if (userPost[0] === null) return null;

  return (
    <>
      {userPost.map((user) => (
        <div className={styles.userPost} key={user.id}>
          <div>
            <h2>
              {user.User.firstName} {user.User.lastName}
            </h2>
            <h3></h3>
            <h4>{createdAt(user.createdAt)}</h4>
          </div>

          <div>
            <img src={user.photo} />
            <p>{user.context}</p>
          </div>

          <CommentSection post={user} comments={user.Comments} />
        </div>
      ))}
    </>
  );
}

export default UserPost;
