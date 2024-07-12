const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/memoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 모델 정의
const memoSchema = new mongoose.Schema({
  userId: String,
  day: String,
  content: String,
});

const todoSchema = new mongoose.Schema({
  userId: String,
  items: [String],
});

const Memo = mongoose.model('Memo', memoSchema);
const ToDo = mongoose.model('ToDo', todoSchema);

// 미들웨어
app.use(cors());
app.use(bodyParser.json());

// 예시로 사용자 ID 설정 (실제 로그인 시스템에서는 로그인한 사용자의 ID를 설정)
app.use((req, res, next) => {
  req.user = { id: 'test-user-id' }; // 실제 로그인 시스템에서는 여기에 실제 사용자 ID를 설정
  next();
});

// 메모 불러오기
app.get('/api/memos', async (req, res) => {
  const memos = await Memo.find({ userId: req.user.id });
  res.json(memos);
});

// 메모 저장하기
app.post('/api/memos', async (req, res) => {
  const { day, content } = req.body;
  let memo = await Memo.findOne({ userId: req.user.id, day });
  if (memo) {
    memo.content = content;
  } else {
    memo = new Memo({ userId: req.user.id, day, content });
  }
  await memo.save();
  res.sendStatus(200);
});

// To-Do 리스트 불러오기
app.get('/api/todos', async (req, res) => {
  const todo = await ToDo.findOne({ userId: req.user.id });
  res.json(todo ? todo.items : []);
});

// To-Do 리스트 저장하기
app.post('/api/todos', async (req, res) => {
  const { items } = req.body;
  let todo = await ToDo.findOne({ userId: req.user.id });
  if (todo) {
    todo.items = items;
  } else {
    todo = new ToDo({ userId: req.user.id, items });
  }
  await todo.save();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
