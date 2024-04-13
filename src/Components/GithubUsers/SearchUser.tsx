import React, {useEffect, useState} from "react";
import {UsersType} from "./GithubUsers";
import axios from "axios";

type PropsType = {
    //searchTerm: string
    onSearch: (users: UsersType[]) => void
}

export function SearchUser({onSearch}: PropsType) {
    const initialSearchState = 'it';
    const [tempSearchTerm, setTempSearchTerm] = useState(initialSearchState)
    const [searchTerm, setSearchTerm] = useState(initialSearchState)

    useEffect(() => {
        axios
            .get(`https://api.github.com/search/users?q=${searchTerm}`) //
            .then(res => {
                    onSearch(res.data.items)
                }
            )
    }, [searchTerm])        //search query

    return <>
        <input type={"text"}
               placeholder={'search'}
               value={tempSearchTerm}
               onChange={(e) => {
                   setTempSearchTerm(e.currentTarget.value)
               }}>
        </input>
        <button onClick={() => {
            setSearchTerm(tempSearchTerm)
        }
        }>Find
        </button>
        <button onClick={() => {
            setSearchTerm(initialSearchState)
            setTempSearchTerm(initialSearchState)
        }
        }>Reset
        </button>
    </>
}