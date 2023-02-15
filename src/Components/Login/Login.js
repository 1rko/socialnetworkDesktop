import React from 'react';
import styles from './Login.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";


const Login = (props) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    )
}

const validate = values => {
    const errors = {};
    if (!values.login) {
        errors.login = 'Required';
    } else if (values.login.length > 15) {
        errors.login = 'Must be 15 characters or less';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const LoginForm = () => (
    <div>
        <Formik
            initialValues={{login: "", password: ""}}
            validate={validate}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="login" placeholder ='login'/>
                    <ErrorMessage name="login" component="div" />
                    <Field type="password" name="password" placeholder ='password'/>
                    <Field type="checkbox" name="rememberMe"/>
                    <label htmlFor="rememberMe">remember me</label>

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);


export default Login;
