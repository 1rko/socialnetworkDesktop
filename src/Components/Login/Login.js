import React from 'react';
import styles from './Login.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";


const Login = (props) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

const validate = values => {
    const errors = {};
    if (!values.login) {
        errors.login = 'Required';
    }
    return errors;
};

const LoginForm = () => (
    <div>
        <Formik
            initialValues={{
                login: "", password: "",
                color: "", firstName: "",
                secondName: ""
            }}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="login" placeholder='login' />
                    <ErrorMessage name="login" component="div" />

                    <Field type="password" name="password" placeholder='password' />
                    <ErrorMessage name="password" component="div" />

                    <Field type="checkbox" name="rememberMe" /><label htmlFor="rememberMe">remember me</label>

                    <Field name="color" component="select">
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                    </Field>

                    <Field name="firstName">
                        {({ field, form, meta }) => (
                            <div>
                                <input type="text" {...field} placeholder="first Name" />
                                {meta.touched &&
                                    meta.error && <div className="error">{meta.error}</div>}
                            </div>
                        )}
                    </Field>

                    <Field name="secondName" component={CustomInputComponent} placeholder="Second Name" />

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, dirty }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => (
    <div>
        <input type="text" {...field} {...props} onClick={() => console.log(dirty)} />
        {touched[field.name] &&
            errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
);

export default Login;


