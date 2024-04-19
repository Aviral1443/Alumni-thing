document.getElementById("submit-btn").addEventListener("click", () => {
  email = document.getElementById("email").value;
  // console.log();
  password = document.getElementById("password").value;
  // console.log(x);

  try {
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log("Logged in")
    });
  } catch (err) {
    console.log("fsfdsafsad");
  }
});


try {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
      window.location.href = "/home";
    } else {
      console.log('user logged out');
    }
  })
} catch (err) {
  console.log("fsfdsafsad");
}
