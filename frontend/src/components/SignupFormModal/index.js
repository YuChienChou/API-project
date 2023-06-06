import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [validationErrors, setValidationErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    const errorLi = {};
    if(!email) errorLi.email = 'please provide email';
    if(!username || username.length < 4) errorLi.username = 'please provide username';
    if(!firstName) errorLi.firstName = 'please provide first Name';
    if(!lastName) errorLi.lastName = 'please provide last name';
    if(!password || password.length < 6) errorLi.password = 'please provide password';
    if(!confirmPassword) errorLi.confirmPassword = 'please confirm password';

    setValidationErrors(errorLi);

  }, [email, username, firstName, lastName, password, confirmPassword])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .then(history.push('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
    <div className='signup-form-container'>
      <h1>Sign Up</h1>
      <div className='signup-error-container'>
        {errors.email && <p className='error'>{errors.email}</p>}
        {errors.username && <p className='error'>{errors.username}</p>}
        {errors.firstName && <p className='error'>{errors.firstName}</p>}
        {errors.lastName && <p className='error'>{errors.lastName}</p>}
        {errors.password && <p className='error'>{errors.password}</p>}
        {errors.confirmPassword && (
          <p id='confirm-password-error'>{errors.confirmPassword}</p>
        )}
      </div>
      <form 
      onSubmit={handleSubmit}
      className='signup-form'
      >
        <label>
          
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        
        <label>
          
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username: at least 4 character"
          />
        </label>
       
        <label>
          
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        
        <label>
          
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        
        <label>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password: at least 6 character"
          />
        </label>
        
        <label>
          
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        
        <button 
        type="submit"
        disabled={Object.values(validationErrors).length > 0}
        id={Object.values(validationErrors).length > 0 ? "sign-up-button-disabled" : "sign-up-button-active"}
        >Sign Up</button>
      </form>
      </div>

      {(() => console.log("this runs at the end of return"))()}
    </>
  );
}

export default SignupFormModal;