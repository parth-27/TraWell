import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Title } from './Title';
import { Button } from '@material-ui/core';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  companyName: yup
    .string()
    .required('Company Name is required')
    .max(20),
  modelName: yup
    .string()
    .required('Model Name is required')
    .max(20),
  registration: yup
    .string()
    .required('Registration Number is required')
    .max(25),
});

export const FormUserDetails = ({ formData, setFormData, nextStep }) => {
  const classes = useStyles();
  return (
    <>
      <Title title='Enter User Details' />
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            {/* <label> Company Name </label>
            <select>
              <option value="" disabled selected>Select a Car Company</option>
              <option> Hyundai  </option>
              <option> Kia  </option>
              <option> Mahindra </option>
              <option> Jeep </option>
            </select>
            
            <label> Model Name </label>
            <select>
              <option value="" disabled selected>Select a Car Model</option>
              <option> </option>
            </select> */}
            
            <Field
              name='companyName'
              label='Company Name *'
              margin='normal'
              as={TextField}
              error={touched.companyName && errors.companyName}
              helperText={touched.companyName && errors.companyName}
            />
            <Field
              name='modelName'
              label='Model Name *'
              margin='normal'
              as={TextField}
              error={touched.modelName && errors.modelName}
              helperText={touched.modelName && errors.modelName}
            />
            <Field
              name='registration'
              label='Registration Number *'
              margin='normal'
              as={TextField}
              error={touched.registration && errors.registration}
              helperText={touched.registration && errors.registration}
            />
            
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

FormUserDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};