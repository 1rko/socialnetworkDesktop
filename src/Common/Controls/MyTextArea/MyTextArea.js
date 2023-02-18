import React from "react";
import styles from './MyTextArea.module.css'

const MyTextArea = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, dirty }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const hasError = (touched[field.name] && errors[field.name])
    return (

        <div>
            <div>
                <textarea {...field} {...props} onClick={() => console.log(errors)}
                    className={styles.newPostTextArea + " " + (hasError ? styles.error : "")} />
            </div>
            {hasError && <div className={styles.errorText}>{errors[field.name]}</div>}
        </div>
    )
};

export default MyTextArea