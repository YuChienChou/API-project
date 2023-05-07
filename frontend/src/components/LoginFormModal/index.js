import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const {validationErrors, setValidationErrors} = useState({});

  // useEffect(() => {
  //   const errors = {};
  //   if(credential.length < 4) errors.credential = 'please provide username or email';
  //   if(password.length < 6) errors.password = 'please prvide password';

  //   setValidationErrors(errors);
  // }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <div className='form-container'>
      {errors.credential && (
          <p>{errors.credential}</p>
        )}
      <form 
      onSubmit={handleSubmit}
      className='login-form'
      >
        <label>
          
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        
        <button 
        type="submit"
        className='login-button'
        // disabled={Object.values(validationErrors).length > 0}
        >Log In</button>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;