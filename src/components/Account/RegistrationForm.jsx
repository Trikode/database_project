import React, { useState } from 'react';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import "../../pages/Account/account.css"

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      setPasswordError('Passwords do not match. Please try again');
    } else {
      setPasswordError('');
      try {
        const response = await fetch('http://localhost:3308/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        console.log(email,password)
        if (response.ok) {
          // User registration successful
          console.log('User registered successfully');
          setEmail('');
          setPassword('');
          setPasswordCheck('');
        } else {
          // Error occurred during registration
          const data = await response.json();
          console.error('Error registering user:', data.error);
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <div className="accountRegist">
        
        
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
                />
                <button
                type="button"
                className="toggle-password"
                onClick={handleTogglePasswordVisibility}
                >
                 {showPassword ?  <RiEyeLine />:<RiEyeCloseLine /> }
                </button>
            </div>
            <div className="password-input">
                <input
                type={showPassword2 ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password again"
                value={passwordCheck}
                onChange={handlePasswordCheckChange}
                required
                />
                <button
                type="button"
                className="toggle-password"
                onClick={handleTogglePasswordVisibility2}
                >
                 {showPassword2 ?  <RiEyeLine />:<RiEyeCloseLine /> }
                </button>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <button type="submit" className='loginBtn'>Register</button>
        </form>
        </div>
   
  );
}

export default RegistrationForm;
