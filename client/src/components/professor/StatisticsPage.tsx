import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';

interface StatisticsItem {
  id: number,
  name: string,
  totalPending: number,
  totalPassed: number,
  totalFailed: number
}

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<StatisticsItem[]>([]);


  useEffect(() => {
    axios.get('/professor/statistics').then(res => {
      setStatistics(res.data);
    })
  }, [])

  if (!statistics) {
    return null;
  }
  return (
    <div>
      <div className='header'>Statistics</div>
      <ResponsiveContainer width='100%' aspect={16 / 9} >
        <BarChart
          data={statistics}
        >
          <XAxis dataKey='name' />
          <Tooltip />
          <YAxis />
          <Bar dataKey="totalPending" fill="#8884d8" />
          <Bar dataKey="totalPassed" fill="#82ca9d" />
          <Bar dataKey="totalFailed" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
