import React from 'react';
import styles from './Login.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";
import {getCaptchaUrlThunkCreator, loginThunkCreator} from '../../redux/authReducer';
import {connect} from 'react-redux'
import MyInput from "../../Common/Controls/MyInput/MyInput";
import {Navigate} from "react-router-dom";
import * as Yup from 'yup';
import {AppStateType} from "../../redux/reduxStore";

type LoginPropsType = {
    captchaUrl: string | null
    isAuthorised: boolean
    loginFunc: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    getCaptchaUrl: () => void
}

const Login = (props: LoginPropsType) => {
    if (props.isAuthorised) {
        return <Navigate to={'/profile'}/>;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm loginFunc={props.loginFunc} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

/*const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    }

    return errors;
};*/

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
});

type LoginFormPropsType = {
    captchaUrl: string | null
    loginFunc: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const LoginForm = (props: LoginFormPropsType) => (
    <div className={styles.login_form}>
        <Formik
            initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
            validationSchema={SignupSchema}
            onSubmit={(values, {setSubmitting}) => {
                    props.loginFunc(values.email, values.password, values.rememberMe = false, values.captcha);
                    setSubmitting(false);
            }}
        >
            {({errors, isSubmitting}) => {
                console.log(errors);
                return (
                    <Form>
                        <Field component={MyInput} name="email" placeholder='email'/>

                        <Field type="password" name="password" placeholder='password'/>
                        <ErrorMessage name="password" component="div"/>

                        <Field type="checkbox" name="rememberMe"/><label htmlFor="rememberMe">remember me</label>

                        {props.captchaUrl && <img src={props.captchaUrl} alt={'captcha'}/>}
                        {props.captchaUrl && <><Field name="captcha" placeholder='captcha'/>
                            <ErrorMessage name="captcha" component="div"/></>}

                        <div>{!(Object.keys(errors).length == 0) ? "Some error" : null}</div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>

                    </Form>
                )
            }
            }
        </Formik>
    </div>
);

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorised: state.auth.isAuthorised,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {loginFunc: loginThunkCreator, getCaptchaUrl: getCaptchaUrlThunkCreator})(Login);


