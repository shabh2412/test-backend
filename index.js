const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
  res.send(users);
});

app.post("/login", (req, res) => {
  // parse body
  const user = req.body;
  // sanity checks
  if (!user?.email || !user?.password) {
    res.send({
      message: "Email or password is empty.",
    });
    return;
  }
  // take the email and password, and check if any user in the db matches the given credentials
  const { email, password } = user;
  let exists = false;
  let found_user = null;
  for (let u of users) {
    if (u?.email === email && u?.password === password) {
      exists = true;
      found_user = u;
      break;
    }
  }
  res.send({
    user_verified: exists,
    user_details: found_user,
  });
});

app.post("/signup", (req, res) => {
  const user = req.body;
  console.log(user);
  if (Object.keys(user)?.length > 0) {
    let exists = false;
    for (let u of users) {
      if (u?.email === user?.email) {
        exists = true;
        break;
      }
    }
    if (exists) {
      res.send({
        message: "user already exists! please login.",
      });
    }
    else if (!user?.email || !user?.password || !user?.name) {
      res.send({
        message: "Please fill all required parameters.",
      });
    }
    else {
      users.push(user);
      res.send({
        message: "User added successfully!",
        user,
      });
    }
  }
  else {
    res.send({
      message: "Invalid body!",
      user,
    });
  }
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running, ${PORT}`);
});