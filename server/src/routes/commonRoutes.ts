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

router.get('/', async (req, res) => {
  res.json((req as any).user);
})

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
  const imgName = 'files/' + file.originalname
  const targetPath = path.resolve(imgName);
  console.log(targetPath);
  fs.rename(tempPath, targetPath, (err) => {
    if (!err) {
      res.json({
        fileUrl: 'http://localhost:8080/' + imgName
      })
    } else {
      console.log(err);
      res.status(500).json({ error: "Server error" })
    }
  })
})



export default router;