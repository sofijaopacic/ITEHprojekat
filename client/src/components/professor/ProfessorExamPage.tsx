import React, { useState, useEffect } from 'react'
import { Exam, Professor } from '../../types'
import axios from 'axios'
import ExamTable from '../ExamTable';
import { Button, Modal } from 'rsuite';
import ExamForm from './ExamForm';

interface Props {
  professor: Professor
}

export default function ProfessorExamPage(props: Props) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get('/professor/exam').then(res => {
      setExams(res.data.map((exam: any) => {
        return {
          ...exam,
          professor: props.professor
        }
      }));
    })
  }, [])

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Create exam</Modal.Header>
        <Modal.Body>
          <ExamForm
            onSubmit={async val => {
              const res = await axios.post('/professor/exam', val);
              setExams(prev => {
                return [...prev, { ...res.data, professor: props.professor }]
              })
            }}
          />
        </Modal.Body>
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
        <div className='header'>
          Exams
        </div>
        <Button
          appearance='primary'
          onClick={() => setOpenModal(true)}
        >Create exam</Button>
      </div>
      <ExamTable
        link
        exams={exams}
      />
    </div>
  )
}
