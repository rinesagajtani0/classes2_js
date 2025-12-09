// Basic level:

// Implement the User class. When creating an instance based on this class, the object must have the form {name: ‘Petro’, role: ‘admin’} (role can be either admin or user). In case of incorrectly transferred data of such an object, the corresponding field that was entered incorrectly should be warned using an alert. The User class must have the following components: 

// getName
// getRole
// login
// logout
// сhangeName
// changePassword
// The Admin class should have the following components:

// addUser
// removeUser
// changeUserRole
// getAllUsers
// removeAllUsers

class User {
  constructor(name, role = "user", password) {
    if (typeof name !== "string" || !name.trim()) {
      alert("⚠ Invalid name! Using default 'Unknown'.");
      this.name = "Unknown";
    } else {
      this.name = name.trim();
    }

    if (role !== "admin" && role !== "user") {
      alert(`Invalid role "${role}"! Using default 'user'.`);
      this.role = "user";
    } else {
      this.role = role;
    }

    if (typeof password !== "string" || password.length < 8) {
      alert("Password must be at least 8 characters!");
      throw new Error("Invalid password. User not created.");
    } else {
      this.password = password;
    }

    this.isLoggedIn = false;
  }

  getName() {
    return this.name;
  }

  getRole() {
    return this.role;
  }

  login() {
    this.isLoggedIn = true;
    console.log(`${this.name} logged in.`);
  }

  logout() {
    this.isLoggedIn = false;
    console.log(`${this.name} logged out.`);
  }

  changeName(newName) {
    if (typeof newName !== "string" || !newName.trim()) {
      alert("⚠ Invalid new name!");
      return;
    }
    console.log(`Name changed: ${this.name} → ${newName.trim()}`);
    this.name = newName.trim();
  }

  changePassword(oldPassword, newPassword) {
    if (this.password !== oldPassword) {
      alert("Incorrect old password!");
      return;
    }

    if (typeof newPassword !== "string" || newPassword.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    this.password = newPassword;
    console.log(`Password changed successfully for ${this.name}`);
  }
}

class Admin extends User {
  constructor(name, password) {
    super(name, "admin", password);
    this.users = [];
  }

  addUser(user) {
    if (!(user instanceof User)) {
      alert("Only User objects can be added!");
      return;
    }
    this.users.push(user);
    console.log(`User added: ${user.name}`);
  }

  removeUser(username) {
    this.users = this.users.filter(user => user.name !== username);
    console.log(`User removed: ${username}`);
  }

  changeUserRole(username, newRole) {
    const user = this.users.find(user => user.name === username);

    if (!user) {
      alert("User not found!");
      return;
    }

    if (newRole !== "admin" && newRole !== "user") {
      alert("Role must be admin or user!");
      return;
    }

    console.log(`Role updated for ${username}: → ${newRole}`);
    user.role = newRole;
  }

  getAllUsers() {
    console.table(this.users.map(user => ({
      Name: user.name,
      Role: user.role,
      LoggedIn: user.isLoggedIn
    })));
    return this.users;
  }

  removeAllUsers() {
    this.users = [];
    console.log("All users removed!");
  }

  static isAdmin(user) {
    return user instanceof User && user.role === "admin";
  }
}


let enteredName = prompt("Enter your name:");
let enteredRole = prompt("Enter your role (admin/user):");
let enteredPassword = prompt("Create a password (at least 8 characters):");

let currentUser;

try {
  if (enteredRole === "admin") {
    currentUser = new Admin(enteredName, enteredPassword);
  } else {
    currentUser = new User(enteredName, enteredRole, enteredPassword);
  }

  console.log(`Welcome, ${currentUser.getName()}! Role: ${currentUser.getRole()}`);
  currentUser.login();
} catch (error) {
  alert("User creation failed due to invalid input.");
  throw error;
}

let changeNameConfirm = confirm("Do you want to change your name?");
if (changeNameConfirm) {
  let newName = prompt("Enter your new name:");
  currentUser.changeName(newName);
}

let changePwConfirm = confirm("Do you want to change your password?");
if (changePwConfirm) {
  let oldPw = prompt("Enter your old password:");
  let newPw = prompt("Enter new password (8+ characters):");
  currentUser.changePassword(oldPw, newPw);
}

if (currentUser.getRole() === "admin") {
  const admin = currentUser;

  console.log("Admin Mode Activated!");

  let addMore = true;

  while (addMore) {
    let userNameToAdd = prompt("Enter a user name to add:");
    let userRoleToAdd = prompt("Enter their role (admin/user):");
    let userPasswordToAdd = prompt("Create a password for this user (8+ characters):");

    try {
      const newUser = new User(userNameToAdd, userRoleToAdd, userPasswordToAdd);
      admin.addUser(newUser);
    } catch (err) {
      alert("Failed to add user. Please try again.");
    }

    addMore = confirm("Do you want to add another user?");
  }

  console.log("Final users list:");
  admin.getAllUsers();
}

console.log("End of interaction demo!");








// Intermediate level:

// In the HTML page, add the ability for the user to create their own dashboard of clocks. These are clocks for different parts of the world. It is necessary to add an input field and a button to create a new clock when clicked. WorldClock is implemented via the class. Each instance of this class is a new clock. The class must have the following components:

// getCurrentDate
// getCurrentDateTime
// deleteClock
// button one – shows the user the time in text form
// button two – displays the current date and time in text form
// button three – deletes the clock from the "wall" of clocks

// Mockup(a simple model)