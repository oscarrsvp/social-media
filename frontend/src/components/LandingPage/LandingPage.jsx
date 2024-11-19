import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MobileContext } from '../../App';
import LoginForm from '../LoginForm/LoginForm';
import styles from './LandingPage.module.css';
import socialGathering from '../../assets/friends-gathering.jpeg';

function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const isMobile = useContext(MobileContext);

  if (sessionUser) return <Navigate to="/homepage" replace={true} />;

  return (
    <div className={styles.landingPage}>
      {isMobile && (
        <div className={styles.header}>
          <h1>Connect and Discover</h1>
          <span>Endless possibilities await.</span>
        </div>
      )}

      {!isMobile && (
        <div className={`flex ${styles.sections}`}>
          <div className={styles.heading}>
            <h1>Bring Moments to Life: Share with Family and Friends</h1>
          </div>
          <img src={socialGathering} alt="friends-gathering" srcSet="" />
        </div>
      )}
      <div id={styles.sectionForm} className={`flex ${isMobile ? null : styles.section}`}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LandingPage;
