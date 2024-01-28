import React from 'react';
import styles from './ProfileDataForm.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";
import MyInput from "../../../../Common/Controls/MyInput/MyInput";
import * as Yup from "yup";
import {getCaptchaUrlThunkCreator} from "../../../../redux/authReducer";
import {ContactsType, ProfileType} from "types";

type PropsType = {
    saveProfile: (profile: ProfileType) => void
    finishEditMode: () => void
    profile: ProfileType
}

const ProfileDataForm = ({profile, ...props}: PropsType) => {
    let contactsValidationSchema = {} as any;
    Object.keys(profile.contacts).map(key => {                  //пробегаем map все контакты и создаем для них ValidationSchema
            //@ts-ignore
            return contactsValidationSchema[key] = Yup.string().matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
            )
        }
    )

    const DisplayingErrorMessagesSchema = Yup.object().shape({
            fullName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            aboutMe: Yup.string().required('Required'),
            contacts: Yup.object().shape(contactsValidationSchema)
        })
    ;

    return <>
        <Formik initialValues={{
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            userId: profile.userId,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            photos: profile.photos,
            contacts: {...profile.contacts}                             //вложеность всех контактов
        }}

                validationSchema={DisplayingErrorMessagesSchema}

                onSubmit={(values, {setSubmitting}) => {
                    //@ts-ignore
                    props.saveProfile(values).then(response => {
                            if (!response)
                                props.finishEditMode()
                            else {
                                alert(response)
                            }
                        }
                    )
                    ;

                    setSubmitting(false);

                }}>
            {({values, errors, isSubmitting}) => {
                return (
                    <Form>
                        <div className={styles.editLabel}> Full name</div>
                        <Field component={MyInput} name="fullName" placeholder='fullName'/>
                        <ErrorMessage name="fullName" component="div"/>

                        <div className={styles.editLabel}> About me</div>
                        <Field component={MyInput} name="aboutMe" placeholder='aboutMe'/>
                        <ErrorMessage name="aboutMe" component="div"/>

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
                            <div>Contacts</div>
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
                                        <ErrorMessage name={'contacts.' + contact} component="div"
                                                      className={styles.errorMessage}/>
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
