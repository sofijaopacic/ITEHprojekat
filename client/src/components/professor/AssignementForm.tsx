import React, { useEffect, useState } from 'react'
import { Button, Checkbox, CheckboxGroup, Form, Input, Modal, Schema } from 'rsuite'
import { Assignement } from '../../types'

//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
interface Props {
  open: boolean,
  onClose: () => void,
  initial?: Assignement,
  onSubmit: (val: any) => Promise<void>
}

const model = Schema.Model({
  name: Schema.Types.StringType().isRequired(),
  points: Schema.Types.NumberType().isRequired(),
  description: Schema.Types.StringType().isRequired(),
  flags: Schema.Types.ArrayType()
})

const emptyState = {
  name: '',
  points: 0,
  description: '',
  flags: [] as string[]
}

export default function AssignementForm(props: Props) {
  const [formState, setFormState] = useState(emptyState)

  useEffect(() => {
    if (!props.initial) {
      setFormState(emptyState);
      return;
    }
    setFormState({
      name: props.initial.name,
      points: props.initial.points,
      description: props.initial.description,
      flags: props.initial.required ? ['required'] : [],
    })
  }, [props.initial])

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>Assignement form</Modal.Header>
      <Modal.Body>
        <Form
          formValue={formState}
          onChange={(val: any) => {
            setFormState(val);
          }}
          model={model}
          onSubmit={async valid => {
            if (!valid) {
              return;
            }

            props.onSubmit({
              name: formState.name,
              points: formState.points,
              description: formState.description,
              required: formState.flags.includes('required')
            });
            props.onClose();
          }}
        >
          <Form.Group>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name='name' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Points</Form.ControlLabel>
            <Form.Control name='points' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Flags</Form.ControlLabel>
            <Form.Control name='flags' accepter={CheckboxGroup}>
              <Checkbox value='required'>Required</Checkbox>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name='description' accepter={Textarea} />
          </Form.Group>
          <Button type='submit' appearance='primary' className='fluid'>Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
