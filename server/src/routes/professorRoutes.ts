import { Router } from "express";
import { In } from "typeorm";
import { UserConstants } from "../constants";
import { AppDataSource } from "../data-source";
import { Assignement } from "../entity/Assignement";
import { Exam } from "../entity/Exam";
import { Submission } from "../entity/Submission";
import { Professor, User } from "../entity/User";


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
  const assignementId = Number(req.query.page) || 0;
  let status = req.query.status as string | string[] | undefined;

  let where: any = {}

  if (assignementId) {
    where.assignementId = assignementId
  }
  if (status && status.length > 0) {
    where.status = In(Array.isArray(status) ? status : [status]);
  }

  const submissions = await AppDataSource.getRepository(Submission)
    .find({
      where,
      relations: {
        assignement: true,
        student: true,
        professor: true
      },
      skip: page * size,
      take: size
    });

  res.json(submissions);
})

router.patch('/submission/:id', async (req, res) => {
  const submission = await AppDataSource.getRepository(Submission).findOne({
    relations: {
      student: true,
      assignement: true
    },
    where: {
      id: Number(req.params.id)
    }
  })
  const professor = (req as any).user as Professor;
  if (!submission) {
    res.sendStatus(404);
    return;
  }
  submission.professor = professor;
  submission.points = req.body.points;
  submission.status = req.body.status;
})

router.get('/statistics', async (req, res) => {

  const data = await AppDataSource.createQueryBuilder()
    .select("a.id", 'id')
    .addSelect('a.name', 'name')
    .addSelect(`s.status`, 'status')
    .addSelect(`CASE WHEN (s.status='pending) THEN 1 ELSE 0 END`, 'totalPending')
    .addSelect(`CASE WHEN (s.status='passed) THEN 1 ELSE 0 END`, 'totalPassed')
    .addSelect(`CASE WHEN (s.status='failed) THEN 1 ELSE 0 END`, 'totalFailed')
    .from(Assignement, 'a')
    .leftJoin(Submission, 's', 's.assignementId = a.id')
    .groupBy('a.id')
    .addGroupBy('s.status')
    .orderBy('total', 'DESC')
    .getRawMany()
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


export default router;