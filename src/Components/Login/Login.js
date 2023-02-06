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

/*const LoginForm = (props) => {
    return (
        <div>
            <div>
                <input placeholder={'Login'} name={'Login'}/>
            </div>
            <div>
                <input placeholder={'Password'} name={'Password'}/>
            </div>
            <div>
                <input type={'checkbox'} name={'RememberMe'} id={'RememberMe'} value={'RememberMe'}/>
                <label htmlFor="RememberMe">remember me</label>
            </div>
            <button>Send form</button>
        </div>

    )
}*/

const LoginForm = () => (
    <div>
        <Formik
            initialValues={{login: "", password: ""}}

            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values.login, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="login" placeholder ='login'/>
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
