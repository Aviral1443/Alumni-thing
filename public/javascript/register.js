document.getElementById("submit-btn").addEventListener("click", () => {
  name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  year = document.getElementById("year").value;
  option = document.getElementById("lang").value;
  try {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      console.log(cred);
    });
  } catch (err) {}

  db.collection("users").add({
    email: email,
    name: name,
    year: year,
    role: option,
    profile_link: ""
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user logged in: ", user);
    window.location.href = "/home";
  } else {
    console.log("user logged out");
  }
});
