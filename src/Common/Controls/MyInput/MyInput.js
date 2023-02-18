import React from "react";
import styles from './MyInput.module.css'

const MyInput = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, dirty }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const hasError = (touched[field.name] && errors[field.name])
    return (

        <div>
            <div>
                <input {...field} {...props} onClick={() => console.log(errors)}
                    className={styles.basicInput + " " + (hasError ? styles.error : "")} />
            </div>
            {hasError && <div className={styles.errorText}>{errors[field.name]}</div>}
        </div>
    )
};

export default MyInput