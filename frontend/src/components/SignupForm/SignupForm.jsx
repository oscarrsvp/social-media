import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { signup } from '../../store/sessionSlice';
import styles from './SignupForm.module.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/homepage" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});

      const userSignup = dispatch(
        signup({
          email,
          firstName,
          lastName,
          password,
        }),
      );

      return userSignup.then(async (res) => {
        const data = await res.payload;
        if (data) setErrors(data);
      });
    }

    return setErrors({
      confirmPassword: 'Confirm Password field must be the same as the Password field',
    });
  };

  return (
    <div id={styles.signupForm} className="flexColumn">
      <div className={styles.header}>
        <h1>Create your account</h1>
        <p>Share photos & save memories with your friends and family</p>
      </div>
      <div className={styles.SignupForm}>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
          <label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
          <label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className="error">{errors.lastName}</p>}
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <label>
            <input
              type="password"
              placeholder="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        <div className={styles.signUpBox}>
          <span>Already have an account?</span>
          <NavLink to="/">Log in</NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
