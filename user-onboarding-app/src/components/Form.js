import React from 'react'
import { withFormik, Form, Field, validateYupSchema } from 'formik'
import * as Yup from 'yup'

function BaseForm({ values, errors, touched }) {
    return (
        <Form>
            <label >
                Name:
                <Field type='text' name='name' />
                {(touched.name && errors.name) ? <p className="error">{errors.name}</p> : ''}
            </label>
            <label >
                Email:
                <Field type='email' name='email' />
                {(touched.email && errors.email) ? <p className="error">{errors.email}</p> : ''}
            </label>
            <label >
                Password:
                <Field type='password' name='password' />
                {(touched.password && errors.password) ? <p className="error">{errors.password}</p> : ''}
            </label>
            <label >
                <Field type='checkbox' name='terms' checked={values.terms} />
                I accept and agree to the Terms of Service
                {(touched.terms && errors.terms) ? <p className="error">{errors.terms}</p> : ''}
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
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        terms: Yup.boolean().oneOf([true], 'you must agree to the Terms of Service'),
    })
})

export default FormikForm(BaseForm)