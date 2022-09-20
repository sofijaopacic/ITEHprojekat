import React from 'react'
import { Button, ButtonGroup, Table } from 'rsuite';
import { Assignement } from '../../types';

interface Props {
  assignements: Assignement[],
  onEdit: (val: Assignement) => void,
  onDelete: (val: Assignement) => void
}


export default function ProfessorAssignementsTable(props: Props) {
  return (
    <Table
      data={props.assignements}
      autoHeight
      rowHeight={60}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey='id' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.Cell dataKey='name' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Points</Table.HeaderCell>
        <Table.Cell dataKey='points' />
      </Table.Column>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Required</Table.HeaderCell>
        <Table.Cell>
          {
            (row: any) => row.required ? 'YES' : 'NO'
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.Cell dataKey='description' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.Cell>
          {(data: any) => {
            return (
              <ButtonGroup>
                <Button
                  onClick={() => {
                    props.onEdit(data)
                  }}
                  appearance='primary' color='green'>Edit</Button>
                <Button
                  onClick={() => {
                    props.onDelete(data)
                  }}
                  appearance='primary' color='red'>Delete</Button>
              </ButtonGroup>
            )
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}
