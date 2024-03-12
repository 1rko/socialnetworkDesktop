import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import React from "react";
import {FilterType} from "../../../redux/usersReducer";
import {useAppSelector} from "./../../../Types/hooks";
import {getFilter} from "../../../redux/usersSelectors";

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: FriendFormType
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = (props) => {

    const filter = useAppSelector(getFilter)

    //const initialValues: FormType = {{term: filter.term, friend: String(filter.friend) as FriendFormType};
    /*const submit = (values: FilterType, actions: FormikHelpers<FormikValues>) => {
        props.onFilterChanged(values)
        console.log({values, actions});
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
    }*/

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            onSubmit={(values, actions) => {
                let term = values.term
                let friend = values.friend === 'null' ? null : values.friend === 'true' ? true : false
                props.onFilterChanged({term, friend})
                //console.log({values, actions});
                actions.setSubmitting(false);
            }}
        >
            <Form>
                <label htmlFor="term">Поиск друзей</label>
                <Field id="term" name="term" placeholder="Search"/>
                <Field name="friend" as="select">
                    <option value="null">All</option>
                    <option value="true">Followed</option>
                    <option value="false">Unfollowed</option>
                </Field>

                <button type="submit">Search</button>
            </Form>
        </Formik>
    </div>
}