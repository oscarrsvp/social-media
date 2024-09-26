import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { updateUser } from '../../store/userSlice';
import styles from './UserPage.module.css';

function ImageHeader({ sessionUserId, user }) {
  const [isActive, setIsActive] = useState(false);
  const [headerImg, setHeaderImg] = useState(null);
  const dispatch = useDispatch();

  const handleFile = (e) => {
    e.preventDefault();

    if (!headerImg) return;

    const formData = new FormData();
    formData.append('headerImg', headerImg);

    dispatch(updateUser(headerImg));

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

    const reader = new FileReader();

    reader.onloadend = () => {
      setHeaderImg(reader.result);
    };

    reader.readAsDataURL(image);

    setIsActive(!isActive);
  };

  return (
    <div className={styles.imgContainer}>
      <img
        src={!headerImg ? user.headerImage : headerImg}
        alt=""
        className={styles.bannerImg}
      />

      {user.id === sessionUserId && (
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
        </div>
      )}
    </div>
  );
}

export default ImageHeader;
