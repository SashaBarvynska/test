import React, { Fragment, useState, useEffect } from 'react'
import { List, ListItem } from '../components'
import Axios, { AxiosPromise } from 'axios'

interface Res {
  mymembers: MembersInterface[]
}

interface MembersInterface {
  id: number,
  firstname: string
  lastname: string
  age: number
  fullname: string
}

const ClientsPage = () => {
  const [members, setMembers] = useState<MembersInterface[]>([])

  const loadMyMembers = async () => {
    const { data } = await (Axios.get('http://127.0.0.1:8000/') as  AxiosPromise<Res>)
    setMembers(data.mymembers)
  }

  useEffect(() => {
    loadMyMembers()
  }, [])

  console.log('mymembers: ', members)

  return (
    <Fragment>
      <List>
        {members.length ? members?.map(({ firstname, lastname, age }, index) => (
          <ListItem key={index}>
            {`${firstname} ${lastname} ${age}`}
          </ListItem>
        )) : []}
      </List>
    </Fragment>
  )
}

export { ClientsPage }
