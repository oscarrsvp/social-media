import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import styles from './LandingPage.module.css';
import socialGathering from '../../assets/friends-gathering.jpeg';

function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Navigate to="/homepage" replace={true} />;

  return (
    <div className={styles.landingPage}>
      <div className={`flex ${styles.sections}`}>
        <div className={styles.heading}>
          <h1>Bring Moments to Life: Share with Family and Friends</h1>
        </div>
        <img src={socialGathering} alt="friends-gathering" srcSet="" />
      </div>
      <div className={`flex ${styles.sections}`}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LandingPage;
