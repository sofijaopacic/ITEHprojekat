import { Router } from "express";
import { In } from "typeorm";
import { UserConstants } from "../constants";
import { AppDataSource } from "../data-source";
import { Assignement } from "../entity/Assignement";
import { Exam } from "../entity/Exam";
import { Submission } from "../entity/Submission";
import { Professor, Student, User } from "../entity/User";
import axios from 'axios'

const router = Router();
router.use((req, res, next) => {
  const user = (req as any).user as User;
  if (user.type !== UserConstants.PROFESSOR) {
    res.sendStatus(403);
  } else {
    next();
  }

})

router.get('/submission', async (req, res) => {
  const size = Number(req.query.size) || 30;
  const page = Number(req.query.page) || 0;
  let status = req.query.status as string | string[] | undefined;

  let where: any = {}


  if (status && status.length > 0) {
    where.status = In(Array.isArray(status) ? status : [status]);
  }

  const [submissions, count] = await AppDataSource.getRepository(Submission)
    .findAndCount({
      where,
      relations: {
        assignement: true,
        student: true,
        professor: true
      },
      skip: page * size,
      take: size
    });

  res.json({
    data: submissions,
    total: count
  });
})

router.patch('/submission/:id', async (req, res) => {
  let submission = await AppDataSource.getRepository(Submission).findOne({
    relations: {
      student: true,
      assignement: true
    },
    where: {
      id: Number(req.params.id)
    }
  })
  const user = (req as any).user as Professor;
  const professor = await AppDataSource.getRepository(Professor).findOne({ where: { id: user.id } })
  if (!submission) {
    res.sendStatus(404);
    return;
  }
  submission.professor = professor;
  submission.points = req.body.points;
  submission.status = req.body.status;
  submission = await AppDataSource.getRepository(Submission).save(submission);
  res.json(submission);
})

router.get('/statistics', async (req, res) => {
  const professor = (req as any).user as Professor;
  const data = await AppDataSource.createQueryBuilder()
    .select("a.id", 'id')
    .addSelect('a.name', 'name')
    .addSelect(`SUM(CASE WHEN (s.status='pending') THEN 1 ELSE 0 END)`, 'totalPending')
    .addSelect(`SUM(CASE WHEN (s.status='passed') THEN 1 ELSE 0 END)`, 'totalPassed')
    .addSelect(`SUM(CASE WHEN (s.status='failed') THEN 1 ELSE 0 END)`, 'totalFailed')
    .from(Assignement, 'a')
    .leftJoin(Submission, 's', 's.assignementId = a.id')
    .leftJoin('a.exam', 'e')
    .leftJoin('e.professor', 'p')
    .where('p.id = :id', { id: professor.id })
    .groupBy('a.id')
    .orderBy('totalPending', 'DESC')
    .getRawMany();

  res.json(data.map(e => {
    return {
      id: Number(e.id),
      name: e.name,
      totalPending: Number(e.totalPending) || 0,
      totalPassed: Number(e.totalPassed) || 0,
      totalFailed: Number(e.totalFailed) || 0,
    }
  }))
})
router.post('/assignement', async (req, res) => {
  const data = req.body;
  const exam = await AppDataSource.getRepository(Exam).findOne({ where: { id: data.examId } });
  const assignement = await AppDataSource.getRepository(Assignement).save({
    description: data.description,
    name: data.name,
    required: data.required,
    points: data.points,
    exam,
  })
  res.json(assignement);
})
router.patch('/assignement/:id', async (req, res) => {
  const data = req.body;
  let assignement = await AppDataSource.getRepository(Assignement).findOne({ where: { id: Number(req.params.id) } })
  if (!assignement) {
    res.sendStatus(404);
    return;
  }
  assignement = await AppDataSource.getRepository(Assignement).save({
    ...assignement,
    ...data
  });
  res.json(assignement);
})
router.delete('/assignement/:id', async (req, res) => {
  const assignement = await AppDataSource.getRepository(Assignement).findOne({ where: { id: Number(req.params.id) } })
  if (!assignement) {
    res.sendStatus(404);
    return;
  }
  await AppDataSource.getRepository(Assignement).delete({ id: Number(req.params.id) })
  res.sendStatus(204);
})
router.get('/exam', async (req, res) => {
  const user = (req as any).user as User;
  const exams = await AppDataSource.getRepository(Exam)
    .find({
      relations: {
        assignements: true
      },
      where: {
        professor: {
          id: user.id
        }
      }
    });
  res.json(exams);
})

router.get('/student', async (req, res) => {
  const students = await AppDataSource.getRepository(Student).find();
  res.json(students);
})

router.post('/exam', async (req, res) => {
  const professor = (req as any).user as Professor;
  const studentIds = req.body.studentIds;
  const students = await AppDataSource.getRepository(Student).find({
    where: {
      id: In(studentIds)
    }
  });
  const exam = await AppDataSource.getRepository(Exam).save({
    assignements: [],
    espb: req.body.espb,
    name: req.body.name,
    professor: {
      id: professor.id
    },
    semester: req.body.semester,
    students: students
  });

  res.json({
    ...exam,
    professor: professor
  })
})


router.get('/exam/:id', async (req, res) => {
  const id = Number(req.params.id);
  const exam = await AppDataSource.getRepository(Exam).findOne({
    where: {
      id
    },
    relations: {
      assignements: true,
      students: true
    }
  })
  res.json(exam);
})

router.patch('/exam/:id', async (req, res) => {
  const id = Number(req.params.id);
  let exam = await AppDataSource.getRepository(Exam).findOne({
    where: {
      id
    }
  });
  const studentIds = req.body.studentIds;
  if (studentIds) {
    const students = await AppDataSource.getRepository(Student).find({
      where: {
        id: In(studentIds)
      }
    });
    exam.students = students;
  }
  if (req.body.name) {
    exam.name = req.body.name;
  }
  if (req.body.semester) {
    exam.semester = req.body.semester;
  }
  if (req.body.espb) {
    exam.espb = req.body.espb;
  }
  exam = await AppDataSource.getRepository(Exam).save(exam);
  res.json(exam);
})

router.get('/weather', async (req, res) => {
  axios.get('http://www.7timer.info/bin/api.pl?lon=20.47246239&lat=44.772349&product=civillight&output=json')
    .then(resp => {
      res.json({
        min: resp.data.dataseries[0].temp2m.min,
        max: resp.data.dataseries[0].temp2m.max,
      })
    })
})
export default router;