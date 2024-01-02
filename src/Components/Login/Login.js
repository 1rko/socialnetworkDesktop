import React from 'react';
import styles from './Login.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";
import {getCaptchaUrlThunkCreator, loginThunkCreator} from '../../redux/authReducer';
import {connect} from 'react-redux'
import MyInput from "../../Common/Controls/MyInput/MyInput";
import {Navigate} from "react-router-dom";
import * as Yup from 'yup';


const Login = (props) => {
    if (props.isAuthorised) {
        return <Navigate to={'/profile'}/>;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={props.login} getCaptchaUrl={props.getCaptchaUrl} captchaUrl={props.captchaUrl}/>
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

const LoginForm = (props) => (
    <div className={styles.login_form}>
        <Formik
            initialValues={{email: '', password: '', captcha: ''}}
            validationSchema={SignupSchema}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    //alert(JSON.stringify(values, null, 2));
                    props.login(values.email, values.password, values.rememberMe = false, values.captcha);
                    setSubmitting(false);
                }, 400);
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

const mapStateToProps = (state) => {
    return {
        isAuthorised: state.auth.isAuthorised,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login: loginThunkCreator, getCaptchaUrl: getCaptchaUrlThunkCreator})(Login);


