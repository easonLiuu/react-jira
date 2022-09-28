import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import * as qs from "qs"


const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, serParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 2000)
    const [list, setlist] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if(response.ok){
                setlist(await response.json())
            }
        })
    }, [debouncedParam])
    
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })
    
    return <div>
        <SearchPanel users={users} param={param} setParam={serParam}/>
        <List users={users} list={list}/>
    </div>
}