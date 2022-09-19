import { Router } from "express";
import { UserConstants } from "../constants";
import { AppDataSource } from "../data-source";
import { Assignement } from "../entity/Assignement";
import { Submission } from "../entity/Submission";
import { Student, User } from "../entity/User";



const router = Router();
router.use((req, res, next) => {
  const user = (req as any).user as User;
  if (user.type !== UserConstants.STUDENT) {
    res.sendStatus(403);
  } else {
    next();
  }

})
router.get('/assignement', async (req, res) => {

  const user = (req as any).user as Student;

  const assignements = await AppDataSource.getRepository(Assignement).find({
    where: {
      exam: {
        users: {
          id: user.id
        }
      }
    }
  })
  const submissions = await AppDataSource.getRepository(Submission).find({
    where: {
      student: user,
    }
  })
  res.json(assignements.map(element => {
    return {
      ...element,
      submission: submissions.find(e => e.assignementId === element.id)
    }
  }));
})

router.post('/submission', async (req, res) => {
  const user = (req as any).user as Student;


  const assignement = await AppDataSource.getRepository(Assignement).findOne({
    where: {
      id: req.body.assignementId
    }
  });
  if (!assignement) {
    res.status(400).json({ error: 'Missing assignement' });
    return;
  }

  const submission = await AppDataSource.getRepository(Submission).findOne({
    where: {
      student: user,
      assignementId: assignement.id
    }
  })
  if (submission) {
    res.status(400).json({ error: 'Already submitted' });
    return;
  }
  const s1 = await AppDataSource.getRepository(Submission).save({
    assignement: assignement,
    assignementId: assignement.id,
    fileName: req.body.fileName,
    fileUrl: req.body.fileUrl,
    points: 0,
    status: 'pending',
    student: user,
  })
  res.json(s1);
})

router.get('/submission', async (req, res) => {
  const user = (req as any).user as Student;

  const submissions = await AppDataSource.getRepository(Submission)
    .find({
      where: {
        student: {
          id: user.id
        }
      },
      relations: {
        assignement: true,
        professor: true,
      }
    });
  res.json(submissions);
})

export default router;