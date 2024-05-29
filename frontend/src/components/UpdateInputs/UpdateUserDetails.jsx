import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/userSlice';

function UpdateUserDetails({ user, update }) {
  const [relationship, setRelationship] = useState(user.relationship || '');
  const [city, setCity] = useState(user.city || '');
  const [gender, setGender] = useState(user.gender || '');
  const [birthday, setBirthday] = useState(user.birthday || '');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const userDetails = {
      relationship,
      city,
      gender,
      birthday,
    };

    const updateDetails = dispatch(updateUser(userDetails));

    return updateDetails.then(async (res) => {
      const data = await res;
      if (res.error) {
        setErrors(data.payload);
      } else {
        update((prev) => !prev);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            <option value="Complicated">It&apos;s Complicated</option>
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
          </select>
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button type="submit" className="btn">
          Save
        </button>
        <button type="button" className="btn" onClick={() => update((prev) => !prev)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateUserDetails;
