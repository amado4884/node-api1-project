const express = require("express");
const cors = require("cors");
const app = express();
const shortid = require("shortid");
const PORT = 5000;

let users = [];

app.use(express.json());
app.use(cors());

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.filter((u) => u.id == id);
  if (user) return res.json(user);
});

app.post("/api/users", (req, res) => {
  if (!req.body) return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  const { name, bio } = req.body;
  if (!name || !bio) return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  const newUser = { id: shortid.generate(), name, bio };
  users = [...users, newUser];
  return res.status(200).json(newUser);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "The user with the specified ID does not exist." });
  const newUsers = users.filter((u) => u.id !== id);
  users = newUsers;
  return res.json({ message: `The user with the ID of: ${id} was successfully removed.` });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!id || (!name && !bio))
    return res.status(400).json({ message: "The user with the specified ID does not exist." });
  const newUsers = users.map((u) => {
    if (u.id !== id) return u;
    if (bio) u.bio = bio;
    if (name) u.name = name;
    return u;
  });
  users = newUsers;
  return res.json({ message: `The user with the ID of: ${id} was successfully updated.` });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
