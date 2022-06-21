import React, { Fragment } from 'react'
import { List, ListItem } from '../components'

const ClientsPage = () => {
  const clients = [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Jane', last_name: 'Smith' },
    { first_name: 'Joe', last_name: 'Schmoe' }
  ]

  return (
    <Fragment>
      <List>
        {clients.map(({ first_name, last_name }, index) => (
          <ListItem key={index}>
            {`${first_name} ${last_name}`}
          </ListItem>
        ))}
      </List>
    </Fragment>
  )
}

export { ClientsPage }
