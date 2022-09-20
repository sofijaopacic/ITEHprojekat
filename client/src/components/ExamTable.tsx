

import React, { useState } from 'react'
import { Exam } from '../types'
import { Table, ButtonGroup, Button, Modal } from 'rsuite'
import { Link } from 'react-router-dom'
interface Props {
  exams: Exam[],
  link?: boolean
}

export default function ExamTable(props: Props) {
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState(0);
  const selected = props.exams.find(e => e.id === selectedId);
  return (
    <>
      <AssignementsForm
        open={openModal}
        onClose={() => { setOpenModal(false) }}
        exam={selected}
      />
      <Table
        autoHeight
        rowHeight={60}
        data={props.exams}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey='id' />
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell>
            {(val: any) => props.link ? (
              <Link to={'/exam/' + val.id}>{val.name}</Link>
            ) : val.name}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Semester</Table.HeaderCell>
          <Table.Cell dataKey='semester' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>ESPB</Table.HeaderCell>
          <Table.Cell dataKey='espb' />
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Professor</Table.HeaderCell>
          <Table.Cell>
            {
              (exam: any) => `${exam.professor.firstName} ${exam.professor.lastName}`
            }
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Actions</Table.HeaderCell>
          <Table.Cell>
            {
              (val: any) => {
                return (
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        setSelectedId(val.id)
                        setOpenModal(true);
                      }}
                    >Assignements</Button>
                  </ButtonGroup>
                )
              }
            }
          </Table.Cell>
        </Table.Column>
      </Table>
    </>
  )
}


interface FormProps {
  open: boolean,
  onClose: () => void,
  exam?: Exam
}

function AssignementsForm(props: FormProps) {
  return (
    <Modal
      size='lg'
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>Assignements</Modal.Header>
      <Modal.Body
        style={{
          minHeight: '400px'
        }}
      >
        <Table
          height={300}
          rowHeight={60}
          data={(props.exam?.assignements || [])}
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
        </Table>
      </Modal.Body>
    </Modal>
  )
}