import React from 'react'
import { withFormik, Form, Field } from 'formik'

function BaseForm({ values }) {
    return (
        <Form>
            <label >
                Name:
                <Field type='text' name='name' />
            </label>
            <label >
                Email:
                <Field type='email' name='email' />
            </label>
            <label >
                Password:
                <Field type='password' name='password' />
            </label>
            <label >
                <Field type='checkbox' name='terms' checked={values.terms} />
                I accept and agree to the Terms of Service
            </label>
            <button type='submit'>Submit</button>
        </Form>
    )
}

const FormikForm = withFormik({
    mapPropsToValues: ({name, email, password, terms}) => {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || true,
        }
    },
    handleSubmit: (values) => {
        console.log(values)
    }
})

export default FormikForm(BaseForm)