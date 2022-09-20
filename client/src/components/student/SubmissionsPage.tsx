import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Submission } from '../../types'
import SubmissionsTable from './SubmissionsTable'

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    axios.get('/student/submission').then(res => setSubmissions(res.data))
  }, [])

  return (
    <div>
      <div className='header'>
        Submissions
      </div>
      <SubmissionsTable submissions={submissions} />
    </div>
  )
}
