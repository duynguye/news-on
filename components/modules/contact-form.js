import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import HeadingMedium from 'components/text/heading-medium'

const ContactForm = () => {
  return (
    <div>
      <HeadingMedium margin={`0 0 40px 0`} centered>Tell us about yourself, select what you're interested in.</HeadingMedium>
      <Formik>
        {({ isSubmitting }) => (
          <Form>
            <Field type='text' name='fullname' />
          </Form>
        )}
      </Formik>
      
      <style jsx>{`
        div {
          background: #f8f8f8;
          padding: 80px 0;
        }  
      `}</style>
    </div>
  )
}

export default ContactForm