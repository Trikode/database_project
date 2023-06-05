import React, { useState } from 'react';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import "../../pages/Account/account.css"

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail("")
    setPassword("")
  };
 

  return (
    <div className="accountLogin" >
        
      
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
            <h4 className='pswForget'>Did you forget your password?</h4>
            </div>
            <button type="submit" className='loginBtn'>Login</button>
        </form>
        
    </div>
  );
}

export default LoginForm;
