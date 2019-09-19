import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function BaseForm({ values, errors, touched }) {
    return (
        <Form>
            <label >
                Name:&nbsp;
                <Field type='text' name='name' />
                {(touched.name && errors.name) ? <p className="error">{errors.name}</p> : ''}
            </label>
            <label >
                Role:&nbsp;
                <Field component='select' name='role'>
                    <option value=''>Select a role</option>
                    <option value='DATA ENGINEER'>DATA ENGINEER</option>
                    <option value='MACHINE LEARNING ENGINEER'>MACHINE LEARNING ENGINEER</option>
                    <option value='WEB UI DEVELOPER'>WEB UI DEVELOPER</option>
                    <option value='WEB REACT I'>WEB REACT I</option>
                    <option value='WEB REACT II'>WEB REACT II</option>
                    <option value='WEB BACKEND (JAVA)'>WEB BACKEND (JAVA)</option>
                    <option value='WEB BACKEND (NODE)'>WEB BACKEND (NODE)</option>
                    <option value='IOS ENGINEER II'>IOS ENGINEER II</option>
                    <option value='ANDROID ENGINEER II'>ANDROID ENGINEER II</option>
                    <option value='PROJECT LEAD'>PROJECT LEAD</option>
                </Field>
                {(touched.role && errors.role) ? <p className="error">{errors.role}</p> : ''}
            </label>
            <label >
                Email:&nbsp;
                <Field type='email' name='email' />
                {(touched.email && errors.email) ? <p className="error">{errors.email}</p> : ''}
            </label>
            <label >
                Password:&nbsp;
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
    mapPropsToValues: ({name, role, email, password, terms}) => {
        return {
            name: name || '',
            role: role || '',
            email: email || '',
            password: password || '',
            terms: terms || true,
        }
    },
    handleSubmit: (values, { props, resetForm }) => {
        //console.log(props)
        axios.post('https://reqres.in/api/users', values)
            .then(resp => {
                //console.log(resp)
                props.addUser(resp.data)
                resetForm({
                    name: '',
                    role: '',
                    email: '',
                    password: '',
                    terms: true,
                })
            })
            .catch( err => {
                console.error(err)
            })
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        role: Yup.mixed().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        terms: Yup.boolean().oneOf([true], 'you must agree to the Terms of Service'),
    })
})

export default FormikForm(BaseForm)