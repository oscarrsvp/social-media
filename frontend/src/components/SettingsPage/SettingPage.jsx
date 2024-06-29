import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, clearUsers } from '../../store/userSlice';
import UpdateUserDetails from '../UpdateInputs/UpdateUserDetails';
import styles from './SettingPage.module.css';

function SettingPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[sessionUser.id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUsers());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (!user) return <h1>Loading</h1>;

  return (
    <section className={styles.settingSection}>
      <h1>Settings Page</h1>
      <UpdateUserDetails user={user} />
    </section>
  );
}

export default SettingPage;
