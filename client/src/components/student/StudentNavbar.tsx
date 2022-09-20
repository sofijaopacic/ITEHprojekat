import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar } from 'rsuite'
import { Student, User } from '../../types'

interface Props {
  user: Student,
  onLogout: () => void
}

export default function StudentNavbar(props: Props) {
  return (
    <Navbar>
      <Navbar.Brand >{props.user.firstName + ' ' + props.user.lastName + ' - ' + props.user.index}</Navbar.Brand>
      <Nav>
        <Nav.Item as={NavLink} to='/' >Exams</Nav.Item>
        <Nav.Item as={NavLink} to='/assignement'>Assignements</Nav.Item>
        <Nav.Item as={NavLink} to='/submission'>Submissions</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item onClick={props.onLogout} >Logout</Nav.Item>
      </Nav>
    </Navbar>
  )
}
