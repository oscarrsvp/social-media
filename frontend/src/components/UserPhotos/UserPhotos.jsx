import { useSelector } from 'react-redux';

function UserPhotos() {
  const userPhotos = useSelector((state) => state.userPhotos);
  const photos = Object.values(userPhotos);

  return (
    <>
      <h1>List of Photos</h1>
      {photos.map((photo) => (
        <img
          src={photo.url}
          alt=""
          key={photo.id}
          style={{ width: '100px', height: '100px' }}
        />
      ))}
    </>
  );
}

export default UserPhotos;
