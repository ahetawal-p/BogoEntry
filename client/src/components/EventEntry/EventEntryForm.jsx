/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-mutable-exports */
import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import STATE from '../../utils/state';

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.state) {
    errors.state = 'Required';
  }
  if (!values.city) {
    errors.city = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

const renderSelect = ({ input, label, meta: { touched, error }, children }) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <div>
      <select {...input}>{children}</select>
      {touched && (error && <p className="help is-danger">{error}</p>)}
    </div>
  </div>
);

let EventEntryForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    stateValue,
    cityValue
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <Field name="state" component={renderSelect} label="State">
        <option value="">Select a state...</option>
        {stateValue.map(stateOption => (
          <option value={stateOption} key={stateOption}>
            {stateOption}
          </option>
        ))}
      </Field>
      <Field name="city" component={renderSelect} label="City">
        <option value="">Select a city...</option>
        {cityValue.map(cityOption => (
          <option value={cityOption} key={cityOption}>
            {cityOption}
          </option>
        ))}
      </Field>
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        <Link to="/register" className="btn btn-link">
          Register
        </Link>
      </div>
    </form>
  );
};

EventEntryForm = reduxForm({
  form: 'event', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(EventEntryForm);

// Decorate with connect to read form values
const selector = formValueSelector('event'); // <-- same as form name
EventEntryForm = connect(state => {
  // can select values individually
  const stateValue = selector(state, 'state');
  let cityValue = [];
  if (!stateValue) {
    cityValue = [];
  } else {
    cityValue = STATE[stateValue];
  }

  return { stateValue: Object.keys(STATE), cityValue };
})(EventEntryForm);

export default EventEntryForm;
