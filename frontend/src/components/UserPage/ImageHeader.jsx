import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { updateUser } from '../../store/userSlice';
import MissingPicture from '../../assets/missing-picture.jpg';
import styles from './UserPage.module.css';

function ImageHeader({ sessionUserId, user }) {
  const [isActive, setIsActive] = useState(false);
  const [headerImg, setHeaderImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const dispatch = useDispatch();

  const handleFile = (e) => {
    e.preventDefault();

    if (!headerImg) return;

    const userData = { ...user, headerImage: headerImg };

    dispatch(updateUser(userData)).then(() => {
      setPreviewImg(null);
    });

    setIsActive(!isActive);
    setHeaderImg(null);

    return;
  };

  const resetImg = () => {
    setIsActive(false);
    setHeaderImg(null);
    setPreviewImg(null);
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];

    if (!image) return;

    if (image.type === 'image/heic' || image.type === 'image/heif') {
      alert(
        'HEIC files are not supported. Please convert your image to JPEG or PNG before uploading.',
      );
      return;
    }

    setHeaderImg(image);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };

    reader.readAsDataURL(image);

    setIsActive(!isActive);
  };

  return (
    <div className={styles.imgContainer}>
      {user.headerImage || previewImg ? (
        <img
          src={!previewImg ? user.headerImage : previewImg}
          alt="banner-img"
          className={styles.bannerImg}
        />
      ) : (
        <img src={MissingPicture} className={styles.bannerImg} />
      )}

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
