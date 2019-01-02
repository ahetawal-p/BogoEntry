/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-mutable-exports */
import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import STATE from '../../utils/state';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.state) {
    errors.state = 'Required';
  }
  if (!values.city) {
    errors.city = 'Required';
  }
  if (!values.zip) {
    errors.zip = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  if (!values.activity) {
    errors.activity = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  if (values.city && values.city === 'other' && !values.otherCity) {
    errors.otherCity = 'Required';
  }
  return errors;
};


const renderCommon = (
  input,
  label,
  type,
  required,
  touched,
  error,
  children,
  componentType
) => (
  <div className="form-group">
    <label htmlFor={label}>{required ? `* ${label}` : `${label}`}</label>
    {componentType === 'input' && (
      <input
        {...input}
        pattern={type === 'tel' ? '[0-9]{3}[0-9]{3}[0-9]{4}' : undefined}
        className={`form-control${touched && error ? ' is-invalid' : ''}`}
        placeholder={label}
        type={type}
      />
    )}
    {componentType === 'select' && (
      <select
        {...input}
        className={`form-control${touched && error ? ' is-invalid' : ''}`}
      >
        {children}
      </select>
    )}
    {componentType === 'textarea' && (
      <textarea
        rows="3"
        cols="20"
        {...input}
        className={`form-control${touched && error ? ' is-invalid' : ''}`}
        placeholder={label}
      />
    )}
    {touched &&
      (error && (
        <div className="col-sm-0">
          <small className="text-danger">{error}</small>
        </div>
      ))}
  </div>
);

const renderField = ({
  input,
  label,
  type,
  required,
  meta: { touched, error }
}) => renderCommon(input, label, type, required, touched, error, null, 'input');

const renderTextArea = ({
  input,
  label,
  type,
  required,
  meta: { touched, error }
}) =>
  renderCommon(input, label, type, required, touched, error, null, 'textarea');

const renderSelect = ({
  input,
  label,
  type,
  required,
  meta: { touched, error },
  children
}) =>
  renderCommon(
    input,
    label,
    type,
    required,
    touched,
    error,
    children,
    'select'
  );

let EventEntryForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    stateValue,
    cityValue,
    hasOtherCityName,
    change
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
        required
      />
      <div className="form-row">
        <div className="col-md-4">
          <Field name="state" component={renderSelect} label="State" required>
            <option value="">Select a state...</option>
            {stateValue.map(stateOption => (
              <option value={stateOption} key={stateOption}>
                {stateOption}
              </option>
            ))}
          </Field>
        </div>
        <div className="col-md-4">
          <Field
            name="city"
            component={renderSelect}
            label="City"
            required
            onChange={() => change('zip', '')}
          >
            <option value="">Select a city...</option>
            {cityValue.map(cityOption => (
              <option value={cityOption} key={cityOption}>
                {cityOption}
              </option>
            ))}
          </Field>
        </div>
        {hasOtherCityName && (
          <div className="col-md-4">
            <Field
              name="otherCity"
              type="text"
              component={renderField}
              label="City Name"
              required
            />
          </div>
        )}
        <div className="col-md-4">
          <Field
            name="zip"
            type="text"
            component={renderField}
            label="Zip"
            required
          />
        </div>
      </div>
      <Field
        name="category"
        type="text"
        component={renderField}
        label="Category"
      />
      <Field
        name="activity"
        type="text"
        component={renderField}
        label="Activity"
        required
      />
      <Field
        name="address"
        type="text"
        component={renderTextArea}
        label="Address"
        required
      />
      <div className="form-row">
        <div className="col-md-4">
          <Field
            name="phone"
            type="tel"
            component={renderField}
            label="Phone No."
          />
        </div>
        <div className="col-md-4">
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
          />
        </div>
        <div className="col-md-4">
          <Field
            name="website"
            type="url"
            component={renderField}
            label="Website"
          />
        </div>
      </div>
      <Field
        name="description"
        type="text"
        component={renderTextArea}
        label="Description"
        required
      />

      <div className="form-row">
        <div className="form-group col-md-4">
          <button
            className="btn btn-outline-primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
        </div>
        <div className="form-group col-md-4">
          <button
            className="btn btn-outline-secondary"
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
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
  if (stateValue) {
    cityValue = [...STATE[stateValue], 'other'];
  }
  let hasOtherCityName = false;
  if (selector(state, 'city') === 'other') {
    hasOtherCityName = true;
  }
  const returnObject = {
    stateValue: Object.keys(STATE),
    cityValue,
    hasOtherCityName,
    initialValues: state.event.editEvent
  };

  const { event } = state;
  if (event && event.editEvent && event.editEvent.otherCity) {
    returnObject.initialValues.city = 'other';
    returnObject.hasOtherCityName = true;
  }
  return returnObject;
})(EventEntryForm);

export default EventEntryForm;
