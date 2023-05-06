import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
 useEffect(()=> {
    const errors = {};
    if(credential.length < 4) errors.credential = 'please enter Username or Email';
    if(password.length < 6) errors.password = 'please enter password';

    setValidationErrors(errors);
  }, [credential, password]);
  if (sessionUser) return <Redirect to="/" />;

 

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
    <div className='form-container'>
      <h1>Log In</h1>
      <form className='login-form'
      onSubmit={handleSubmit}>
        {errors.credential && <p className='error'>{errors.credential}</p>}
        <label>
          
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
            className='login-input'
          />
        </label>
        <label>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className='login-input'
          />
        </label>
        
        <button type="submit"
        disabled={Object.values(validationErrors).length > 0}
        className='login-button'
        >Log In</button>
      </form>
    </div>
    </>
  );
}

export default LoginFormPage;