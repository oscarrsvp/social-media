import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { updateUser } from '../../store/userSlice';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './UserPage.module.css';

function ImageHeader({ sessionUserId, user }) {
  const [isActive, setIsActive] = useState(false);
  const [headerImg, setHeaderImg] = useState(null);
  const { profileImage } = user;
  const dispatch = useDispatch();

  const handleFile = (e) => {
    e.preventDefault();

    if (!headerImg) return;

    const formData = new FormData();
    formData.append('headerImg', headerImg);

    dispatch(updateUser(formData));

    setIsActive(!isActive);
    return;
  };

  const resetImg = () => {
    setIsActive(!isActive);
    setHeaderImg(null);
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];

    if (!image) return;

    setHeaderImg(image);

    setIsActive(!isActive);
  };

  return (
    <div className={styles.imgContainer}>
      <img src={user.headerImage} alt="" className={styles.bannerImg} />

      {profileImage ? (
        <img src={profileImage} alt="user-img" className={styles.profileImg} />
      ) : (
        <img src={BlankImage} className={styles.profileImg} />
      )}

      {user.id === sessionUserId ? (
        <div className={styles.imgButton}>
          {isActive ? (
            <>
              <input type="file" name="headerImg" onChange={(e) => handleFileChange(e)} />
              <div>
                <button className="btn" onClick={handleFile}>
                  Add
                </button>
                <button className="btn" onClick={resetImg}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <label htmlFor="image">
              <input
                type="file"
                name="headerImg"
                id="image"
                onChange={(e) => handleFileChange(e)}
              />

              <span className="btn center" onClick={(prev) => setIsActive(!prev)}>
                <AiOutlinePlusCircle /> Edit
              </span>
            </label>
          )}
          {headerImg && <p>Selected File: {headerImg.name}</p>}
        </div>
      ) : null}
    </div>
  );
}

export default ImageHeader;
