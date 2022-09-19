import { Router } from "express";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Exam } from "../entity/Exam";
export const uplaodMiddleware = multer({
  dest: '/file'
}).fields([
  {
    name: 'file',
    maxCount: 1
  }
])

const router = Router();


router.post("/upload", uplaodMiddleware, (req, res) => {
  const user = (req as any).user as User;
  if (!req.files) {
    return;
  }
  if (!req.files['file']) {
    return;
  }
  const file = req.files['file'][0];
  const tempPath = file.path;
  const imgName = 'img/' + user.id + '/' + file.originalname
  const targetPath = path.resolve(imgName);
  fs.rename(tempPath, targetPath, (err) => {
    if (!err) {
      res.json({
        fileUrl: 'https://localhost:8000/' + imgName
      })
    } else {
      res.status(500).json({ error: "Server error" })
    }
  })
})

router.get('/exam', async (req, res) => {
  const user = (req as any).user as User;
  const exams = await AppDataSource.getRepository(Exam)
    .find({
      relations: {
        assignements: true
      },
      where: {
        users: {
          id: user.id
        }
      }
    });
  res.json(exams);
})

export default router;