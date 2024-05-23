import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import styles from './LandingPage.module.css';

function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Navigate to="/homepage" replace={true} />;

  return (
    <div className={styles.landingPage}>
      <div className={`flex ${styles.sections}`}>
        <h1>LANDING PAGE PICTURE</h1>
      </div>
      <div className={`flex ${styles.sections}`}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LandingPage;
