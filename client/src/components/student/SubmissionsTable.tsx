import React from 'react'
import { Button, Table } from 'rsuite'
import { Submission } from '../../types'

interface Props {
  submissions: Submission[]
}

export default function SubmissionsTable(props: Props) {
  return (
    <Table
      data={props.submissions}
      autoHeight
      rowHeight={60}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey='id' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Assignement</Table.HeaderCell>
        <Table.Cell dataKey='assignement.name' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Points</Table.HeaderCell>
        <Table.Cell dataKey='points' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.Cell dataKey='status' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Professor</Table.HeaderCell>
        <Table.Cell>
          {(val: any) => val.professor ? (val.professor.firstName + ' ' + val.professor.lastName) : '/'}
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Link</Table.HeaderCell>
        <Table.Cell>
          {(data: any) => {
            const submission = data as Submission;
            return (
              <Button
                onClick={() => {
                  fetch(submission.fileUrl)
                    .then(res => res.blob())
                    .then(blob => {
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.style.display = 'none';
                      a.href = url;
                      // the filename you want
                      const splitted = submission.fileUrl.split('/')
                      a.download = splitted[splitted.length - 1];
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                    })
                }}
              >Download</Button>
            )
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}
