import React, { useState } from 'react'
import { FlexboxGrid, Form, Button } from 'rsuite'
import { Link } from 'react-router-dom'

interface Props {
  onLogin: (data: any) => void
}

export default function LoginPage(props: Props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  return (
    <div>
      <FlexboxGrid justify='center'>
        <FlexboxGrid.Item colspan={8}>
          <div className='header'>
            Login
          </div>
          <Form
            fluid
            formValue={formState}
            onChange={(val: any) => {
              setFormState(val);
            }}
            onSubmit={() => {
              props.onLogin(formState);
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name='email' type='email' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control name='password' type='password' />
            </Form.Group>
            <Button className='fluid' appearance='primary' type='submit' >Login</Button>
            <Link to='/register'>
              <Button className='fluid' appearance='primary' color='violet' type='button' >Don't have an account?</Button>
            </Link>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}
