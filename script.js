// localStorage
var users = JSON.parse(localStorage.getItem("user")) || [];
var editIndex = -1;

// New user add
function addUser(e) {
  e.preventDefault();

  var newUser = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
    phone: document.getElementById("phone").value,
  };
  //edit
  if (editIndex === -1) {
    users.push(newUser);
  } else {
    users[editIndex] = newUser;
    editIndex = -1;
  }

  localStorage.setItem("user", JSON.stringify(users));

  e.target.reset();
  showUsers();
}

// Show users
function showUsers() {
  var list = document.getElementById("userList");
  list.innerHTML = "";

  for (var i = 0; i < users.length; i++) {
    list.innerHTML += `
      <tr>
        <td>${users[i].name}</td>
        <td>${users[i].email}</td>
        <td>${users[i].city}</td>
        <td>${users[i].phone}</td>
        <td><button class="delete-btn" onclick="deleteUser(${i})">Delete</button>
      <button class="edit-btn" onclick="editUser(${i})">Edit</button></td>
      </tr>
    `;
  }
}

//edit
function editUser(i) {
  document.getElementById("name").value = users[i].name;
  document.getElementById("email").value = users[i].email;
  document.getElementById("city").value = users[i].city;
  document.getElementById("phone").value = users[i].phone;

  editIndex = i;
}

//Delete
function deleteUser(i) {
  users.splice(i, 1);
  localStorage.setItem("user", JSON.stringify(users));
  //edit
  if (editIndex === i) {
    editIndex = -1;
    document.querySelector("form").reset();
  } else if (editIndex > i) {
    editIndex--;
  }

  showUsers();
}

showUsers();
