import { useState } from 'react';
import { login } from '../../store/sessionSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './LoginForm.module.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const userLogin = dispatch(login({ email, password }));

    return userLogin.then(async (res) => {
      const data = await res.payload;
      if (data) setErrors(data);
    });
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    return dispatch(login({ email: 'jennysmith@aa.io', password: 'password' }));
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
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
          <label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div id={styles.showPasswordContainer}>
            <label>
              <input type="checkbox" onClick={() => setShowPassword((value) => !value)} />
              Show Password
            </label>
          </div>

          {errors.credential && <p className="error">{errors.credential}</p>}

          <button className="btn" type="submit">
            Log In
          </button>
          <button className="btn" onClick={(e) => handleDemoUser(e)}>
            Demo User
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
