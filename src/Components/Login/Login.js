import React from 'react';
import styles from './Login.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginThunkCreator } from '../../redux/authReducer';
import { connect } from 'react-redux'


const Login = (props) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={props.login} />
        </div>
    )
}

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};

const LoginForm = (props) => (
    <div className={styles.login_form}>
        <Formik
            initialValues={{ email: "", password: "" }}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    props.login(values.email, values.password, values.rememberMe = false);
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="email" placeholder='email' />
                    <ErrorMessage name="email" component="div" />

                    <Field type="password" name="password" placeholder='password' />
                    <ErrorMessage name="password" component="div" />

                    <Field type="checkbox" name="rememberMe" /><label htmlFor="rememberMe">remember me</label>

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>

                </Form>
            )}
        </Formik>
    </div>
);

export default connect(null, { login: loginThunkCreator })(Login);


