import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSpinner } from '@fortawesome/pro-light-svg-icons'
import ReCAPTCHA from 'react-google-recaptcha'
import css from 'styled-jsx/css'
import fetch from 'isomorphic-unfetch'
import { motion, useAnimation } from 'framer-motion'
import * as Yup from 'yup'

import HeadingMedium from 'components/text/heading-medium'


const Error = ({ children }) => (
  <div>
    { children }

    <style jsx>{`
      div {
        color: red;
        font-family: 'Brandon Text', sans-serif;
        font-size: 12px;
        padding: 6px 0;
      }  
    `}</style>
  </div>
)

const FieldWrapper = ({ children }) => (
  <div>
    { children }

    <style jsx>{`
      div {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
        }
    `}</style>
  </div>
)

const Label = ({ children }) => (
  <>
    <label>{ children }</label>

    <style jsx>{`
        label {
          color: #001425;
          font-family: 'Brandon Text', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 17px;
          margin-bottom: 10px;
        }
      `}</style>
  </>
)

const TextField = ({ label, field, form: { touched, errors }, ...props }) => {
  return (
    <FieldWrapper>
      <Label>{ label }</Label>
      <input {...field} {...props} />
      <ErrorMessage name={field.name} component={Error} />

      <style jsx>{`
        input {
          appearance: none;
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0;
          font-family: 'Brandon Text', sans-serif;
          font-size: 18px;
          padding: 10px;
          width: 100%;
        }
      `}</style>
    </FieldWrapper>
  )
}

const MessageField = ({ label, field, form, ...props }) => {
  return (
    <FieldWrapper>
      <Label>{ label }</Label>
      <textarea {...field} {...props} rows='6' />
      <ErrorMessage name={field.name} component={Error} />
      
      <style jsx>{`
        textarea {
          appearance: none;
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0;
          font-family: 'Brandon Text', sans-serif;
          font-size: 18px;
          padding: 10px;
          resize: vertical;
          width: 100%;
        }
      `}</style>
    </FieldWrapper>
  )
}

const PhoneField = ({ label, field, form, ...props }) => {
  return (
    <FieldWrapper>
      <Label>{ label }</Label>
      <input {...field} {...props} />
      <ErrorMessage name={field.name} component={Error} />
      
      <style jsx>{`
        input {
          appearance: none;
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0;
          font-family: 'Brandon Text', sans-serif;
          font-size: 18px;
          padding: 10px;
          width: auto;
        }
      `}</style>
    </FieldWrapper>
  )
}

const CheckboxField = ({ label, field, form, ...props }) => {
  return (
    <div className='wrapper'>
      <input type='checkbox' {...field} {...props} />
      <span className={field.value && 'active'} onClick={() => {
        form.setFieldValue(field.name, !field.value)
      }}>
        { label }
        { field.value && <FontAwesomeIcon icon={faTimes} style={{ fontSize: 18, marginLeft: 5 }} /> }
      </span>
      
      <style jsx>{`
        div {
          position: relative;
        }

        input {
          appearance: none;
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0;
          font-family: 'Brandon Text', sans-serif;
          font-size: 18px;
          height: 100%;
          opacity: 0;
          padding: 10px;
          position: absolute;
          pointer-events: none;
        }

        span {
          background: #F2F9FF;
          border: 1px solid #008FD6;
          border-radius: 33px;
          cursor: pointer;
          display: inline-flex;
          font-family: 'Brandon Text';
          font-size: 14px;
          color: #008FD6;
          letter-spacing: 0;
          margin: 5px;
          padding: 10px 20px;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .active {
          background: #008FD6;
          border-radius: 33px;
          font-family: 'Brandon Text';
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
      `}</style>
    </div>
  )
}

const ContactSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Name is too short!')
    .required('Your name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Your email is required'),
  phone: Yup.string()
    .required('Phone number is required'),
  message: Yup.string()
    .min(5, 'Message is too short!')
    .required('A message is required')
})

const Feedback = forwardRef((props, ref) => {
  const controls = useAnimation()
  const { className, styles } = css.resolve`
    div {
      background: #4BB543;
      border-radius: 5px;
      bottom: 30px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
      color: white;
      font-family: 'Brandon Text', sans-serif;
      margin: 0 auto;
      opacity: 0;
      padding: 30px;
      position: fixed;
      pointer-events: none;
      right: 30px;
      width: 25vw;
      z-index: 100000;
      user-select: none;
    }

    @media screen and (max-width: 1600px) {
      div {
        width: 40vw;
      }
    }

    @media screen and (max-width: 650px) {
      div {
        left: 0;
        right: 0;
        margin: 0 8.33333vw;
        width: calc(100% - ${8.33333 * 2}vw);
      }
    }
  `

  useImperativeHandle(ref, () => ({
    showDialog() {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      })
    
      setTimeout(() => {
        controls.start({
          opacity: 0
        })
      }, 4000)
    }
  }))

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={controls} className={className}>
      { 'Your information has been successfully submitted. We will be in touch with you as soon as possible.' }
      { styles }
    </motion.div>
  )
})

const ContactForm = () => {
  const [submitText, setSubmitText] = useState('Submit')
  const recaptchaRef = useRef()
  const feedbackRef = useRef()

  return (
    <div>
      <HeadingMedium margin={`0 0 40px 0`} centered>Tell us about yourself, select what you're interested in.</HeadingMedium>
      <Formik
        initialValues={{
          addstation: false,
          advertiser: false,
          press: false,
          join: false,
          other: false,
          fullname: '',
          title: '',
          company: '',
          email: '',
          phone: '',
          message: ''
        }}

        validationSchema={ContactSchema}

        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitText(<FontAwesomeIcon icon={faSpinner} spin/>)
          const result = recaptchaRef.current.execute();
          
          fetch('/api/process-form-submissions', {
            method: 'POST',
            body: JSON.stringify(values)
          }).then(response => {
            feedbackRef.current.showDialog()
            setSubmitText('Submit')
            setSubmitting(false)
            resetForm(true)
          })
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='checkboxes'>
              <Field label='Add your TV station' name='addstation' component={CheckboxField} />
              <Field label='Become an advertiser' name='advertiser' component={CheckboxField} />
              <Field label='Press inquiry' name='press' component={CheckboxField} />
              <Field label='Join the team' name='join' component={CheckboxField} />
              <Field label='Other' name='other' component={CheckboxField} />
            </div>

            <div className='field-groups'>
              <Field label='Full Name *' type='text' name='fullname' component={TextField} />
              <Field label='Title' type='text' name='title' component={TextField} />
              <Field label='Company' type='text' name='company' component={TextField} />
              <Field label='E-mail *' type='text' name='email' component={TextField} />
              <Field label='Phone Number *' type='text' name='phone' component={PhoneField} />
              <Field label='Message *' type='text' name='message' component={MessageField} />
              <button type='submit' disabled={isSubmitting}>{ submitText }</button>
            </div>

            <ReCAPTCHA 
              ref={recaptchaRef}
              size="invisible"
              sitekey="6LdbOsoUAAAAAB2Z4assA0n_Qb3_LqkpIcrpAfh0"
            />
          </Form>
        )}
      </Formik>

      <Feedback ref={feedbackRef} />
      
      <style jsx>{`
        div {
          background: #f8f8f8;
          padding: 80px 0;
        }

        div.checkboxes {
          align-items: center;
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          margin: 0 auto 40px;
          padding: 0;
          width: 50vw;
        }

        div.field-groups {
          margin: 0 auto;
          padding: 0;
          width: ${8.33333 * 3}vw;
        }

        button {
          appearance: none;
          background-color: #008FD6;
          border-radius: 3px;
          border: none;
          color: #ffffff;
          cursor: pointer;
          font-family: 'Brandon Text', sans-serif;
          font-size: 18px;
          font-weight: 500;
          line-height: 23px;
          padding: 16px 60px;
          user-select: none;
        }

        button::-moz-focus-inner {
          border: 0;
        }

        @media screen and (max-width: 1600px) {
          div.field-groups {
            width: 50vw;
          }
        }

        @media screen and (max-width: 1100px) {
          div {
            padding: 40px ${8.33333 * 3}vw;
          }

          div.field-groups {
            width: 100%;
          }
        }

        @media screen and (max-width: 650px) {
          div {
            padding: 40px 8.33333vw;
          }

          div.field-groups {
            width: 100%;
          }

          div.checkboxes {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default ContactForm