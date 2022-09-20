import React, { useState } from 'react'
import { Button, Form, InputPicker, Modal } from 'rsuite'


interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (val: any) => Promise<void>
}

const empty = {
  points: 0,
  status: 'failed' as string
}

export default function ReviewForm(props: Props) {
  const [formState, setFormState] = useState(empty);
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>Review</Modal.Header>
      <Modal.Body>
        <Form
          formValue={formState}
          onChange={(val: any) => {
            setFormState(val);
          }}
          onSubmit={async () => {
            await props.onSubmit(formState);
            props.onClose();
          }}
        >
          <Form.Group>
            <Form.ControlLabel>Points</Form.ControlLabel>
            <Form.Control type='number' name='points' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Status</Form.ControlLabel>
            <Form.Control
              name='status'
              accepter={InputPicker}
              data={['passed', 'failed'].map(e => {
                return {
                  value: e,
                  label: e
                }
              })}
            />
          </Form.Group>
          <Button className='fluid' type='submit'>Review</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
