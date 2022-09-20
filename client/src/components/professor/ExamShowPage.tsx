import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Button, FlexboxGrid } from 'rsuite';
import { Exam, Professor } from '../../types';
import AssignementForm from './AssignementForm';
import ExamForm from './ExamForm';
import ProfessorAssignementsTable from './ProfessorAssignementsTable';

interface Props {
  professor: Professor
}

export default function ExamShowPage(props: Props) {
  const [exam, setExam] = useState<Exam | undefined>(undefined);
  const id = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignementId, setSelectedAssignementId] = useState(0)

  useEffect(() => {
    axios.get('/professor/exam/' + id).then(res => {
      setExam({
        ...res.data,
        professor: props.professor
      });
    })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return null;
  }
  if (!exam) {
    navigate('/');
    return null;
  }
  const selected = (exam.assignements || []).find(e => e.id === selectedAssignementId);
  return (
    <div>
      <div className='header'>
        Exam {exam.name}
      </div>
      <FlexboxGrid justify='space-between'>
        <FlexboxGrid.Item colspan={11}>
          <ExamForm initial={exam}
            onSubmit={async val => {
              const res = await axios.patch('/professor/exam/' + id, val);
              setExam({
                ...res.data,
                professor: props.professor
              })
            }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <AssignementForm
            open={openModal}
            onClose={() => {
              setOpenModal(false)
              setSelectedAssignementId(0);
            }}
            initial={selected}
            onSubmit={async val => {
              if (!selected) {
                const res = await axios.post('/professor/assignement', { ...val, examId: exam.id });
                setExam(prev => {
                  if (!prev) {
                    return prev;
                  }
                  return {
                    ...prev,
                    assignements: prev.assignements ? [...prev.assignements, res.data] : [res.data]
                  }
                })
              } else {
                const res = await axios.patch('/professor/assignement/' + selectedAssignementId, { ...val, examId: exam.id });
                setExam(prev => {
                  if (!prev) {
                    return prev;
                  }
                  return {
                    ...prev,
                    assignements: (prev.assignements || []).map(e => {
                      if (e === selected) {
                        return res.data;
                      }
                      return e;
                    })
                  }
                })
              }
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0'
            }}
          >
            <div className='header'>Assignements</div>
            <div >
              <Button
                onClick={() => {
                  setOpenModal(true);
                  setSelectedAssignementId(0);
                }}
              >Create new</Button>
            </div>
          </div>
          <ProfessorAssignementsTable
            assignements={exam.assignements || []}
            onEdit={ass => {
              setSelectedAssignementId(ass.id);
              setOpenModal(true);
            }}
            onDelete={async ass => {
              await axios.delete('/professor/assignement/' + ass.id);
              setExam(prev => {
                if (!prev) {
                  return prev;
                }
                return {
                  ...prev,
                  assignements: (prev?.assignements || []).filter(e => e !== ass)
                }
              })
            }}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}
