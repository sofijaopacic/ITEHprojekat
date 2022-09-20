

export interface Assignement {
  id: number,
  name: string,
  points: number,
  required: boolean,
  description: string,
  exam?: Exam,
  submission?: Submission
}

export interface Exam {
  id: number,
  name: string,
  semester: number,
  espb: number,
  professor: Professor,
  assignements?: Assignement[],
  students?: Student[]
}

export interface User {
  id: number,
  email: string,
  type: 'STUDENT' | 'PROFESSOR',
  firstName: string,
  lastName: string,
}

export interface Professor extends User {
  type: 'PROFESSOR'
}
export interface Student extends User {
  type: 'STUDENT',
  index: string
}

export type SubmissionStatus = 'pending' | 'passed' | 'failed';

export interface Submission {
  id: number,
  assignementId: number,
  createdAt: string,
  fileUrl: string,
  status: SubmissionStatus,
  student?: Student,
  professor?: Professor,
  points: number,

  assignement?: Assignement
}