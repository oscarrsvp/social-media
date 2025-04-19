import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import { createPost } from '../../store/postSlice';
import { BsCardImage } from 'react-icons/bs';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './Post.module.css';

function CreatePost() {
  const [photo, setPhoto] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [context, setContext] = useState('');
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const fullName = `${sessionUser.firstName || ''} ${sessionUser.lastName || ''}`;

  useEffect(() => {
    if (!context.trim()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [context]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setErrors({});

      const newPost = dispatch(createPost({ photo, context }));

      setIsLoading((prev) => !prev);

      return newPost.then(async (res) => {
        const data = await res;

        if (data.error) {
          setErrors(data.payload);
          setIsLoading(false);
        } else {
          setPhoto(null);
          setPreviewImg(null);
          setContext('');
          setIsLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
    }
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

    setPhoto(image);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };

    reader.readAsDataURL(image);
  };

  const resetImg = () => {
    setPreviewImg(null);
    setPhoto(null);
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.userDetails}>
        {sessionUser.profileImage ? (
          <img src={sessionUser.profileImage} alt="" className={styles.profileImg} />
        ) : (
          <img src={BlankImage} className={styles.profileImg} />
        )}
        <h3>{fullName}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            placeholder={`What's on your mind, ${sessionUser.firstName}?`}
            value={context}
            onChange={(e) => setContext(e.target.value)}
          ></textarea>
          {errors.context && <p className="error">{errors.context}</p>}
        </label>

        <div className={styles.UploadImage}>
          {!previewImg && (
            <label>
              <input type="file" name="postImg" onChange={(e) => handleFileChange(e)} />
              <BsCardImage />
              <span>Photo</span>
            </label>
          )}

          {previewImg && (
            <div className={styles.previewImgSection}>
              <img src={previewImg} alt="" className={styles.previewImg} />

              <VscChromeClose
                cursor={'pointer'}
                overflow={'visible'}
                onClick={resetImg}
              />
            </div>
          )}
        </div>

        {errors.photo && <p className="error">{errors.photo}</p>}
        {!disabled && (
          <button
            className="btn success-btn"
            type="submit"
            disabled={disabled || isLoading}
          >
            Share Post
          </button>
        )}
      </form>
    </div>
  );
}

export default CreatePost;
