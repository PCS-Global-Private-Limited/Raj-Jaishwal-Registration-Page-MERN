import React, {useState} from 'react'
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [form, setForm] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        password:'',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if(!form.firstName) {
            newErrors.firstName = 'First Name is required';
        } else if(!/^[A-Z][a-z]{2,}$/.test(form.firstName)) {
            newErrors.firstName = 'Must start with a letter and contain at least 3 characters';
        }

        if(!form.lastName) {
            newErrors.lastName = 'Last Name is required';
        } else if(!/^[A-Z][a-z]{2,}$/.test(form.lastName)) {
            newErrors.lastName = 'Must start with a letter and contain at least 3 characters';
        }

        if(!form.email) {
            newErrors.email = 'email is required';
        } else if(!/@gmail.com/.test(form.email)) {
            newErrors.email = 'Invalid email format';
        }

        if(!form.phone) {
            newErrors.phone = 'Phone Number is required';
        } else if(!/^[6-9]\d{9}$/.test(form.phone)) {
            newErrors.phone = 'Invalid Phone Number format. Must start with 6-9 and contain 10 digits';
        }

        if(!form.password) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])([^\s]){6,}$/.test(form.password)
        ) {
            newErrors.password = 'Password must contain at least 6 characters with at least one uppercase, one lowercase, one number and a special character';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        let newValue = value;

        if(name === 'firstName' || name === 'lastName') {
            newValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
        setForm({...form, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert('Registration Successful!');
        }
    };


  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <input type="text" name='firstName' placeholder='First Name' value={form.firstName} onChange={handleChange} className='input'/>
          <p className='error'>{errors.firstName}</p>
        </div>
        
        <div className="form-group">
          <input type="text" name='lastName' placeholder='Last Name' value={form.lastName} onChange={handleChange} className='input'/>
          <p className='error'>{errors.lastName}</p>
        </div>

        <div className="form-group">
          <input type="text" name='email' placeholder='email' value={form.email} onChange={handleChange} className='input'/>
          <p className='error'>{errors.email}</p>
        </div>

        <div className='form-group'>
          <input type="text" name='phone' placeholder='Phone Number' value={form.phone} onChange={handleChange} className='input'/>
          <p className='error'>{errors.phone}</p>
        </div>

        <div className="form-group">
          <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={form.password} onChange={handleChange} className='input'/>
          <p className='error'>{errors.password}</p>
          <label className='show-password'>
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Show Password
          </label>
        </div>

        <button type='submit' className='btn'>Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm
