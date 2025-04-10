import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MobileContext } from '../../App';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import styles from './LandingPage.module.css';

function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const isMobile = useContext(MobileContext);
  const [isSignUp, setIsSignUp] = useState(false);

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
        <div className={`flex ${styles.sectionOne}`}>
          <div className={styles.heading}>
            <h1>Share the Moments that Matter Most with Family and Friends</h1>
          </div>
        </div>
      )}
      <div id={styles.sectionForm} className={`flex`}>
        {isSignUp ? (
          <SignupForm />
        ) : (
          <>
            <LoginForm />
          </>
        )}
        <div className={styles.signUpBox}>
          {isSignUp ? (
            <>
              <span>Already have an account?</span>
              <a role="button" onClick={() => setIsSignUp(false)}>
                Log in
              </a>
            </>
          ) : (
            <>
              <span>Don&apos;t have an account?</span>
              <a role="button" onClick={() => setIsSignUp(true)}>
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
