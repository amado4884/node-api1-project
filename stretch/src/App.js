import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardBody,
  Form,
  CardTitle,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!editing) addUser();
    else {
      updateUser(currentUserId);
      setEditing(false);
      setCurrentUserId(null);
    }
    setName("");
    setBio("");
  };

  const addUser = async () => {
    await axios
      .post("http://localhost:5000/api/users", { name, bio })
      .then((res) => setItems([...items, res.data]))
      .catch((err) => console.log(err));
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then()
      .catch((err) => console.log(err));
  };

  const editUser = async (item) => {
    setEditing(true);
    setCurrentUserId(item.id);
    setName(item.name);
    setBio(item.bio);
  };

  const updateUser = async (id) => {
    await axios
      .put(`http://localhost:5000/api/users/${id}`, { name, bio })
      .then()
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    await axios.get("http://localhost:5000/api/users").then((res) => setItems(res.data));
  };

  useEffect(() => {
    fetchData();
  }, [items]);

  return (
    <Container style={{ textAlign: "center" }}>
      <Card>
        <CardTitle>Add User</CardTitle>
        <CardBody>
          <Form onSubmit={submit}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Name: </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Bio: </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Biography" value={bio} onChange={(e) => setBio(e.target.value)} />
            </InputGroup>
            <Container className="d-flex justify-content-center">
              <Button onClick={submit}>{editing ? "Save" : "Submit"}</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
      {items && (
        <Container className="d-flex justify-content-center align-items-center flex-wrap">
          {items.map((item) => (
            <Card key={item.id}>
              <CardTitle>{item.name}</CardTitle>
              <CardBody>
                <p>{item.bio}</p>
                <Button color="primary" onClick={() => editUser(item)}>
                  Edit
                </Button>{" "}
                -{" "}
                <Button color="danger" onClick={() => deleteUser(item.id)}>
                  Delete
                </Button>
              </CardBody>
            </Card>
          ))}
        </Container>
      )}
    </Container>
  );
}

export default App;
