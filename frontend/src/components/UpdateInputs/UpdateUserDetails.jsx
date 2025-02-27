import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/userSlice';
import { updateFullName } from '../../store/sessionSlice';
import { useModal } from '../../context/Modal';
import styles from '../SettingsPage/SettingPage.module.css';

function UpdateUserDetails({ user }) {
  const [updateStatus, setupdateStatus] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [middleName, setMiddleName] = useState(user.middleName || '');
  const [relationship, setRelationship] = useState(user.relationship || '');
  const [city, setCity] = useState(user.city || '');
  const [gender, setGender] = useState(user.gender || '');
  const [bio, setBio] = useState(user.bio || '');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const userDetails = {
      firstName,
      lastName,
      middleName,
      relationship,
      city,
      gender,
      headerImage: user?.headerImage,
      bio,
    };

    const updateDetails = dispatch(updateUser(userDetails));

    return updateDetails.then(async (res) => {
      const data = await res;
      if (res.error) {
        setErrors(data.payload);
        setupdateStatus(false);
        return;
      }
      dispatch(updateFullName({ firstName, lastName }));
      setupdateStatus(true);
      closeModal();
    });
  };

  return (
    <section className={styles.settingSection}>
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="userSettings">
        <label>
          First Name:
          <input
            type="text"
            name="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label>
          Last Name:
          <input
            type="text"
            name="name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label>
          Middle Name:
          <input
            type="text"
            name="name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        {errors.middleName && <p className="error">{errors.middleName}</p>}

        {/* <label>
          Privacy:
          <select
            name="privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
          >
            <option value="" disabled>
              Select Privacy Settings
            </option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label> */}

        <label>
          Relationship Status:
          <select
            name="relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="" disabled>
              Select Relationship Status
            </option>
            <option value="Single">Single</option>
            <option value="In a Relationship">In a Relationship</option>
            <option value="Engaged">Engaged</option>
            <option value="Married">Married</option>
            <option value="It's Complicated">It&apos;s Complicated</option>
            <option value="Rather Not Say">Rather Not Say</option>
          </select>
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        {errors.city && <p className="error">{errors.city}</p>}
        <label>
          Gender:
          <select
            type="text"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Rather Not Say">Rather Not Say</option>
          </select>
        </label>
        {/* <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        {errors.birthday && <p className="error">{errors.birthday}</p>} */}

        <label>
          <textarea
            name="bio"
            id="bio"
            placeholder="Bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>
        <button type="submit" className="btn" onClick={(e) => handleSubmit(e)}>
          Save Changes
        </button>
      </form>
      {updateStatus && <p className="success">User details updated successfully!</p>}
    </section>
  );
}

export default UpdateUserDetails;
