const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const db = require("./database");

const errorMessage = (res, message, status = 400) =>
  res.status(status).json(message);

app.use(express.json());
app.use(cors());

app.get("/api/users", (req, res) => {
  res.json(db.getUsers());
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id)
    return errorMessage(res, { errorMessage: "Please provide a valid id." });
  const user = db.getUser(parseInt(id));
  if (!user)
    return errorMessage(
      res,
      { message: "The user with the specified ID does not exist." },
      404
    );
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  if (!req.body || !req.body.name || !req.body.bio)
    return errorMessage(res, {
      errorMessage: "Please provide name and bio for the user.",
    });

  const newUser = db.addUser(req.body.name, req.body.bio);
  if (!newUser)
    return errorMessage(
      res,
      {
        errorMessage:
          "There was an error while saving the user to the database",
      },
      500
    );

  return res.status(201).json(newUser);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id)
    return errorMessage(
      res,
      { message: "The user with the specified ID does not exist." },
      404
    );

  const userRemoved = db.removeUser(parseInt(id));
  if (!userRemoved)
    return errorMessage(
      res,
      { errorMessage: "The user could not be removed" },
      500
    );

  return res.json({
    message: `The user with the ID of: ${id} was successfully removed.`,
  });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!id)
    return errorMessage(
      res,
      { message: "The user with the specified ID does not exist." },
      404
    );

  if (!name && !bio)
    return errorMessage(
      res,
      { errorMessage: "Please provide name and bio for the user." },
      400
    );
  const user = db.getUser(parseInt(id));
  user.name = name;
  user.bio = bio;
  const updatedUser = db.updateUser(user);

  if (!updatedUser)
    return errorMessage(
      res,
      { errorMessage: "The user information could not be modified." },
      500
    );

  return res.status(200).json({
    message: `The user with the ID of: ${id} was successfully updated.`,
  });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
