import React, { useState } from 'react'
import { Button, Form, Modal, Schema, Uploader } from 'rsuite'

interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (val: any) => Promise<void>
}

const emptyForm = {
  fileUrl: ''
}

const model = Schema.Model({
  fileUrl: Schema.Types.StringType().isRequired()
})

export default function SubmissionForm(props: Props) {
  const [formState, setFormState] = useState(emptyForm);
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>
          Submission form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          model={model}
          formValue={formState}
          onChange={(val: any) => {
            setFormState(val);
          }}
          onSubmit={async (valid) => {
            if (!valid) {
              return;
            }
            await props.onSubmit(formState);
            props.onClose();
          }}
        >
          <Form.Group>
            <Form.ControlLabel>File</Form.ControlLabel>
            <div
              style={{ display: 'flex' }}
            >
              <Form.Control name='fileUrl' />
              <Uploader
                action={'http://localhost:8080/user/upload'}
                draggable
                fileListVisible={false}
                headers={{
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }}
                onSuccess={(res => {
                  setFormState({
                    fileUrl: res.fileUrl
                  });
                })}
              />
            </div>
          </Form.Group>
          <Button appearance='primary' className='fluid' type='submit'>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
