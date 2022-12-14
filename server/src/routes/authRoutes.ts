import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Student, User } from "../entity/User";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET, UserConstants } from "../constants";

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await AppDataSource.getRepository(User).findOne({
    where: {
      email: email,
      password: password
    }
  });
  if (!user) {
    res.status(400).json({ error: 'Bad credentials' });
    return;
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({
    user,
    token
  })
})

interface UserBody {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  index: string
}

router.post('/register', async (req, res) => {
  const data = req.body as UserBody;
  const user = await AppDataSource.getRepository(User).findOne({
    where: {
      email: data.email,
    }
  });
  if (user) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }
  const createdUser = await AppDataSource.getRepository(Student).save({
    index: data.index,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    type: UserConstants.STUDENT
  })
  const token = jwt.sign({ id: createdUser.id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({
    user: createdUser,
    token
  })
})

export default router;