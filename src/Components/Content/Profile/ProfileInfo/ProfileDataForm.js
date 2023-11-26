import React from 'react';
import styles from './ProfileDataForm.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";
import MyInput from "../../../../Common/Controls/MyInput/MyInput";

const ProfileDataForm = ({profile, ...props}) => {

    return <>
        <Formik initialValues={{
            fullName: profile.fullName,
            userId: profile.userId,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: {...profile.contacts}             //вложеность всех контактов
        }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}>
            {({values, errors, isSubmitting}) => {
                console.log('Errors '+ errors);
                return (
                    <Form>
                        <div className={styles.editLabel}> Full name</div>
                        <Field component={MyInput} name="fullName" placeholder='fullName'/>
                        <ErrorMessage name="fullName" component="div"/>

                        <div className={styles.editLabel}> User Id</div>
                        <Field component={MyInput} name="userId" placeholder='userId'/>
                        <ErrorMessage name="userId" component="div"/>

                        <label>
                            <div className={styles.editLabel}> Looking for a job</div>
                            <Field type="checkbox" name="lookingForAJob"/>
                            {values.lookingForAJob ? 'yes' : 'no'}
                        </label>
                        <ErrorMessage name="lookingForAJob" component="div"/>
                        <br/>

                        <div className={styles.editLabel}> My professional skills</div>
                        <br/>
                        <Field
                            name="lookingForAJobDescription"
                            component="textarea"
                            rows="6"
                            placeholder="My professional skills">
                        </Field>

                        <div>
                            <div> Contacts</div>

                            {Object.keys(values.contacts).map((contact) => {//перебор всех контактов
                                    return <>
                                        <div className={styles.editLabel}> {contact}</div>
                                        <Field
                                            component={MyInput}
                                            key={contact}
                                            name={'contacts.' + contact}    //имя поля - название контакта, содержание
                                            placeholder={contact}           //синхронизируется через Input
                                            className={styles.contacts}
                                        >
                                        </Field>
                                    </>
                                }
                            )
                            }
                            {/*Object.keys(profile.contacts).map((contact, index) => {
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
                            })*/}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Save
                        </button>
                    </Form>
                )
            }
            }

        </Formik>
    </>
}

export default ProfileDataForm;
