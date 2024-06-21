


import React, { useState, useEffect } from 'react';

// Custom hook for form management
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No errors, handle form submission
      console.log(values);
      return true;
    }
    return false;
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

// Validation function
const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.age) {
    errors.age = 'Age is required';
  } else if (values.age <= 0) {
    errors.age = 'Age must be greater than 0';
  }

  if (values.attendingWithGuest === 'yes' && !values.guestName) {
    errors.guestName = 'Guest Name is required if attending with a guest';
  }

  return errors;
};

// Event Registration Form Component
const EventRegistrationForm = () => {

  const initialValues = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'no',
    guestName: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (submittedData) {
      setIsPopupOpen(true);
    }
  }, [submittedData]);

  const onSubmit = e => {
    const formIsValid = handleSubmit(e);
    if (formIsValid) {
      setSubmittedData(values);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSubmittedData(null);
  };

  return (
    <div className='eventContainer'>
      <h2 className='head'>Event Registration Form</h2>
      <form onSubmit={onSubmit} className='form-section'>
        <div className='form-field'>
          <label>
            Name:
          </label>
          <input type="text" name="name" value={values.name} onChange={handleChange} />
          {errors.name && <p className="error_msg">{errors.name}</p>}
        </div>
        <div className='form-field'>
          <label>
            Email:
          </label>
          <input type="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <p className="error_msg">{errors.email}</p>}
        </div>
        <div className='form-field'>
          <label>
            Age:
          </label>
          <input type="number" name="age" value={values.age} onChange={handleChange} />
          {errors.age && <p className="error_msg">{errors.age}</p>}
        </div>
        <div className='form-field'>
          <label>
            Are you attending with a guest?
            <select name="attendingWithGuest" value={values.attendingWithGuest} onChange={handleChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
        </div>
        {values.attendingWithGuest === 'yes' && (
          <div className='form-field'>
            <label>
              Guest Name:
            </label>
            <input type="text" name="guestName" value={values.guestName} onChange={handleChange} />
            {errors.guestName && <p className="error_msg">{errors.guestName}</p>}
          </div>
        )}
        <div className='form-field'>
          <button type="submit" className='submit-btn'>Submit</button>
        </div>
      </form>

      {isPopupOpen && (
        <div style={popupStyles}>
          <div style={popupContentStyles}>
            <h2 className='head' style={{color:"green"}}>Submission Complete</h2>
            <ul className='popup_list'>
              <li className="data">Name: {submittedData.name}</li>
              <li className="data">Email: {submittedData.email}</li>
              <li className="data">Age: {submittedData.age}</li>
              {submittedData.attendingWithGuest === "yes" && <li className="data">Guest: {submittedData.guestName}</li>}
            </ul>
            <button className='closePopUp' onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Popup styles
const popupStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  width: '300px',
  textAlign: 'center',
};

export default EventRegistrationForm;

