import { useState } from 'react';
import { login } from '../store/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

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
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
