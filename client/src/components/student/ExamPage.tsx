import axios from 'axios';
import { useEffect, useState } from 'react';
import { Exam } from '../../types';
import ExamTable from '../ExamTable';


export default function ExamPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  useEffect(() => {
    axios.get('/student/exam').then(res => {
      setExams(res.data);
    })
  }, [])

  return (
    <div>

      <div className='header'>
        Exams
      </div>
      <ExamTable
        exams={exams}
      />
    </div>
  )
}
