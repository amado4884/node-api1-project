let users = [
  {
    id: 1,
    bio: "george.bluth@reqres.in",
    name: "George Bluth",
  },
  {
    id: 2,
    bio: "janet.weaver@reqres.in",
    name: "Janet Weaver",
  },
  {
    id: 3,
    bio: "emma.wong@reqres.in",
    name: "Emma Wong",
  },
  {
    id: 4,
    bio: "eve.holt@reqres.in",
    name: "Eve Holt",
  },
  {
    id: 5,
    bio: "charles.morris@reqres.in",
    name: "Charles Morris",
  },
  {
    id: 6,
    bio: "tracey.ramos@reqres.in",
    name: "Tracey Ramos",
  },

  {
    id: 7,
    bio: "michael.lawson@reqres.in",
    name: "Michael Lawson",
  },
  {
    id: 8,
    bio: "lindsay.ferguson@reqres.in",
    name: "Lindsay Ferguson",
  },
  {
    id: 9,
    bio: "tobias.funke@reqres.in",
    name: "Tobias Funke",
  },
  {
    id: 10,
    bio: "byron.fields@reqres.in",
    name: "Byron Fields",
  },
  {
    id: 11,
    bio: "george.edwards@reqres.in",
    name: "George Edwards",
  },
  {
    id: 12,
    bio: "rachel.howell@reqres.in",
    name: "Rachel Howell",
  },
];

const getUsers = () => users;

const getUser = (id) => {
  const user = users.filter((u) => u.id === id)[0];
  if (!user) return null;
  return { ...user };
};

const addUser = (name, bio) => {
  const oldSize = users.length;
  const newUser = { id: Date.now(), name, bio };
  users = [...users, newUser];
  return oldSize - users.length === -1 ? newUser : null;
};

const removeUser = (id) => {
  const oldSize = users.length;
  const newUsers = users.filter((user) => user.id !== id);
  users = newUsers;
  return oldSize - users.length === 1 ? true : false;
};

const updateUser = (user) => {
  let updated = false;
  users = users.map((u) => {
    if (u.id === user.id) {
      u = { ...user };
      updated = true;
    }
    return u;
  });
  return updated;
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  removeUser,
  updateUser,
};
