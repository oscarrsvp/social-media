import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { VscChromeClose } from 'react-icons/vsc';
import { EditPhotoComment } from '../../store/photoCommentSlice';
import DisplayName from '../Homepage/DisplayName';
import styles from './UpdateInputs.module.css';

function UpdatePhotoComment({ comment }) {
  const { id } = comment;
  const [context, setContext] = useState(comment.context || '');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const editComment = dispatch(EditPhotoComment({ id, context }));

    return editComment.then(async (res) => {
      const data = await res;
      if (data.error) {
        setErrors(data.payload);
      } else {
        setContext('');
        closeModal();
      }
    });
  };

  return (
    <>
      <div>
        <div className={`${styles.header} p-15 border-line`}>
          <DisplayName />
          <VscChromeClose onClick={closeModal} />
        </div>

        <div className="p-15">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Whats on your mind?"
            autoFocus
          ></textarea>
          {errors.context && <p className="error">{errors.context}</p>}
          <button className="btn update-btn" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdatePhotoComment;
