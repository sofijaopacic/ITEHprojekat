import React from 'react'
import { Button, Table } from 'rsuite'
import { Assignement } from '../../types'

interface Props {
  assignements: Assignement[],
  onSubmit: (val: Assignement) => void
}

export default function AssignementsTable(props: Props) {
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
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Exam</Table.HeaderCell>
        <Table.Cell dataKey='exam.name' />
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
        <Table.HeaderCell>Submission</Table.HeaderCell>
        <Table.Cell>
          {(data: any) => {
            const assignement = data as Assignement;
            if (assignement.submission) {
              return (
                <Button
                  onClick={() => {
                    fetch(assignement.submission!.fileUrl)
                      .then(res => res.blob())
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        // the filename you want
                        const splitted = assignement.submission!.fileUrl.split('/')
                        a.download = splitted[splitted.length - 1];
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                      })
                  }}
                >Download</Button>
              )
            }
            return (
              <Button
                onClick={() => {
                  props.onSubmit(assignement)
                }}
              >Submit</Button>
            )
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}
