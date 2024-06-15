import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { updateUser } from '../../store/userSlice';
import { featureComingSoon } from '../../utils/globallyFns';
import styles from './UserPage.module.css';

function ImageHeader({ sessionUserId, user }) {
  const [isActive, setIsActive] = useState(false);
  const [headerImg, setHeaderImg] = useState('');
  const dispatch = useDispatch();

  const updateHeader = async (e) => {
    e.preventDefault();

    return dispatch(updateUser({ headerImage: headerImg }));
  };

  const resetImg = () => {
    setIsActive(!isActive);
    setHeaderImg('');
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   setIsActive(!isActive);
  //   setHeaderImg(file);
  // };

  return (
    <div className={styles.imgContainer}>
      <img src={user.headerImage} alt="" />

      {user.id === sessionUserId ? (
        <div className={styles.imgButton}>
          <form>
            {isActive ? (
              <button className="btn" onClick={resetImg}>
                Cancel
              </button>
            ) : (
              <label htmlFor="image" onClick={(e) => featureComingSoon(e)}>
                <input
                  type="file"
                  name="image"
                  id="image"
                  //   onChange={(e) => handleFileChange(e)}
                />
                <span className="btn center">
                  <AiOutlinePlusCircle /> Edit
                </span>
              </label>
            )}

            {isActive ? (
              <button className="btn" onClick={updateHeader}>
                Add
              </button>
            ) : null}
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default ImageHeader;
