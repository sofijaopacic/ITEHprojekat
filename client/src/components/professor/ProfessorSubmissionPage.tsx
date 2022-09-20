import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Pagination, TagPicker } from 'rsuite';
import { Professor, Submission } from '../../types'
import ProfessorSubmissionsTable from './ProfessorSubmissionsTable'
import ReviewForm from './ReviewForm';

interface Props {
  professor: Professor
}

const initial = {
  data: [] as Submission[],
  total: 0
}

export default function ProfessorSubmissionPage(props: Props) {
  const [sumbissionData, setSumbissionData] = useState(initial);
  const [assignements, setAssignements] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(0);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  useEffect(() => {
    axios.get('/professor/submission', {
      params: {
        size,
        page,
        status: selectedStatuses.length === 0 ? undefined : selectedStatuses
      }
    }).then(res => {
      setSumbissionData(res.data);
    })
  }, [page, selectedStatuses, size])

  return (
    <div>
      <ReviewForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedId(0);
        }}
        onSubmit={async val => {
          await axios.patch('/professor/submission/' + selectedId, val);
          setSumbissionData(prev => {
            return {
              total: prev.total,
              data: prev.data.map(e => {
                if (e.id === selectedId) {
                  return {
                    ...e,
                    professor: props.professor,
                    points: val.points,
                    status: val.status
                  }
                }
                return e;
              })
            }
          })
        }}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0'
      }}>
        <div className='header'>Submissions</div>
        <div>
          <TagPicker
            value={selectedStatuses}
            onChange={setSelectedStatuses}
            data={['pending', 'passed', 'failed'].map(e => {
              return {
                value: e,
                label: e
              }
            })}
          />
        </div>
      </div>
      <ProfessorSubmissionsTable
        submissions={sumbissionData.data}
        onSelect={val => {
          setSelectedId(val.id);
          setOpenModal(true);
        }}
      />
      <Pagination
        total={sumbissionData.total}
        layout={['total', '-', 'limit', '|', 'pager']}
        prev
        last
        first
        next
        limitOptions={[10, 20, 50]}
        limit={size}
        onChangeLimit={(val) => {
          setSize(val)
        }}
        activePage={page + 1}
        onChangePage={val => {
          setPage(val - 1)
        }}

      />
    </div>
  )
}
