import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar } from 'rsuite'
import { Student, User } from '../../types'

interface Props {
  user: User,
  onLogout: () => void
}

export default function ProfessorNavbar(props: Props) {
  const [weather, setWeather] = useState<any>(undefined);

  useEffect(() => {
    axios.get('/professor/weather')
      .then(res => {
        setWeather(res.data);
      })
  }, [])

  return (
    <Navbar>
      <Navbar.Brand >{props.user.firstName + ' ' + props.user.lastName}</Navbar.Brand>
      {
        weather && (
          <Nav >
            <Nav.Item >Weather: {weather.min}C - {weather.max}C </Nav.Item>
          </Nav>
        )
      }
      <Nav>
        <Nav.Item as={NavLink} to='/' >Exams</Nav.Item>
        <Nav.Item as={NavLink} to='/submission'>Submissions</Nav.Item>
        <Nav.Item as={NavLink} to='/statistics'>Statistics</Nav.Item>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={props.onLogout} >Logout</Nav.Item>
      </Nav>
    </Navbar>
  )
}
