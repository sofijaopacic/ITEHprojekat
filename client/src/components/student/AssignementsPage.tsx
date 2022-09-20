import React, { useState, useEffect } from 'react'
import { Assignement } from '../../types'
import axios from 'axios';
import AssignementsTable from './AssignementsTable';
import SubmissionForm from './SubmissionForm';
export default function AssignementsPage() {
  const [assignements, setAssignements] = useState<Assignement[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignementId, setSelectedAssignementId] = useState(0);
  useEffect(() => {
    axios.get('/student/assignement').then(res => {
      setAssignements(res.data);
    })
  }, [])
  return (
    <div>
      <div className='header'>
        Assignements
      </div>
      <SubmissionForm
        open={openModal}
        onClose={() => {
          setOpenModal(false)
          setSelectedAssignementId(0);
        }}
        onSubmit={async val => {
          const res = await axios.post('/student/submission', {
            assignementId: selectedAssignementId,
            fileUrl: val.fileUrl
          });
          setAssignements(prev => {
            return prev.map(e => {
              if (e.id === selectedAssignementId) {
                return {
                  ...e,
                  submission: res.data
                }
              }
              return e
            })
          })
        }}
      />
      <AssignementsTable
        assignements={assignements}
        onSubmit={val => {
          setOpenModal(true);
          setSelectedAssignementId(val.id)
        }}
      />
    </div>
  )
}
