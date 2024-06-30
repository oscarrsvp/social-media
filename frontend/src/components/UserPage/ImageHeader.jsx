import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { updateUser } from '../../store/userSlice';
import styles from './UserPage.module.css';

function ImageHeader({ sessionUserId, user }) {
  const [isActive, setIsActive] = useState(false);
  const [headerImg, setHeaderImg] = useState('' || user.headerImage);
  const dispatch = useDispatch();

  const updateHeader = async (e) => {
    e.preventDefault();
    const { firstName, lastName, profileImage } = user;

    dispatch(updateUser({ headerImage: headerImg, firstName, lastName, profileImage }));
    setIsActive(!isActive);
    return;
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
              <>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={headerImg}
                  placeholder="Enter Image URL"
                  onChange={(e) => setHeaderImg(e.target.value)}
                />
                <div>
                  <button className="btn" onClick={updateHeader}>
                    Add
                  </button>
                  <button className="btn" onClick={resetImg}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <label htmlFor="image" onClick={() => setIsActive(true)}>
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
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default ImageHeader;
