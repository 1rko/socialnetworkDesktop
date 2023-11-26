import React from 'react';
import styles from './ProfileDataForm.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";
import MyInput from "../../../../Common/Controls/MyInput/MyInput";

const ProfileDataForm = ({profile, ...props}) => {
    console.log(profile.contacts)
    return <>
        <Formik initialValues={{
            fullName: profile.fullName,
            userId: profile.userId,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: profile.contacts                                  //массив контактов
        }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        props.login(values.fullName);
                        setSubmitting(false);
                    }, 400);
                }}>
            {({errors, isSubmitting}) => {
                console.log(errors);
                return (
                    <Form>
                        <Field component={MyInput} name="fullName" placeholder='fullName'/>
                        <ErrorMessage name="fullName" component="div"/>

                        <Field component={MyInput} name="userId" placeholder='userId'/>
                        <ErrorMessage name="userId" component="div"/>

                        <Field component={MyInput} name="lookingForAJob" placeholder='lookingForAJob'/>
                        <ErrorMessage name="lookingForAJob" component="div"/>

                        <Field
                            name="lookingForAJobDescription"
                            component="textarea"
                            rows="6"
                            placeholder="My professional skills">
                        </Field>

                        <div>
                            <b>Contacts: </b>
                            {/*Перебор всех контактов, которые в массиве, чтобы не перечислять их в values */}
                            {Object.keys(profile.contacts).map((contact, index) => {
                                return <div>
                                    {contact}
                                    <Field
                                        component={MyInput}
                                        key={contact}
                                        name={"contacts[index]"} //берем значение из values с помощью индекса
                                        placeholder={contact}
                                        className={styles.contacts}
                                    >
                                    </Field>
                                </div>
                            })}
                        </div>
                    </Form>
                )
            }
            }

        </Formik>
    </>
}

export default ProfileDataForm;
