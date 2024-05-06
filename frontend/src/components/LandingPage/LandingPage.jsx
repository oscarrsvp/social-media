import LoginForm from '../LoginForm/LoginForm';
import styles from './LandingPage.module.css';

function LandingPage() {
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
