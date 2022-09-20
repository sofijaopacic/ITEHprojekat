
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Schema, TagPicker } from 'rsuite'
import { Exam, Student } from '../../types'

interface Props {
  initial?: Exam,
  onSubmit: (val: any) => Promise<void>
}

const model = Schema.Model({
  name: Schema.Types.StringType().isRequired(),
  espb: Schema.Types.NumberType().isRequired(),
  semester: Schema.Types.NumberType().isRequired(),
  studentIds: Schema.Types.ArrayType(),
})

const emptyForm = {
  name: '',
  espb: 1,
  semester: 1,
  studentIds: [] as number[]
}

export default function ExamForm(props: Props) {
  const [formState, setFormState] = useState(emptyForm)
  const [students, setStudents] = useState<Student[]>([])
  useEffect(() => {
    axios.get('/professor/student').then(res => {
      setStudents(res.data)
    })
  }, [])

  useEffect(() => {
    if (!props.initial) {
      setFormState(emptyForm);
      return;
    }
    setFormState({
      espb: props.initial.espb,
      name: props.initial.name,
      semester: props.initial.semester,
      studentIds: ((props.initial.students || []).map(e => e.id))
    })
  }, [props.initial])

  return (
    <Form
      fluid
      model={model}
      formValue={formState}
      onChange={(val: any) => {
        setFormState(val)
      }}
      onSubmit={async (valid) => {
        if (!valid) {
          return;
        }
        props.onSubmit(formState);
      }}
    >
      <Form.Group>
        <Form.ControlLabel>Name</Form.ControlLabel>
        <Form.Control name='name' />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Semester</Form.ControlLabel>
        <Form.Control name='semester' />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>ESPB</Form.ControlLabel>
        <Form.Control name='espb' />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Students</Form.ControlLabel>
        <Form.Control name='studentIds'
          accepter={TagPicker}
          data={students.map(s => {
            return {
              value: s.id,
              label: s.index
            }
          })}
        />
      </Form.Group>
      <Button type='submit' className='fluid'>Save</Button>
    </Form>
  )
}
