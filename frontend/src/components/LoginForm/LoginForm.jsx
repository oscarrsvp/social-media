import { useState } from 'react';
import { login } from '../../store/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import styles from './LoginForm.module.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/homepage" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(login({ email, password })).catch(async (res) => {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <div className={styles.loginForm}>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <button className="btn" type="submit">
            Log In
          </button>
        </form>
      </div>

      <div>
        <div className={styles.signUpBox}>
          <span>Don&apos;t have an account?</span>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
