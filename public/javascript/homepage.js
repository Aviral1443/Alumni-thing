var userEmail = "";
let year;

document.getElementById("post-btn").addEventListener("click", () => {
  content = document.getElementById("content").value;
  // console.log(content);
  // console.log(userEmail);
  db.collection("users")
    .where("email", "==", userEmail)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        year = doc.data().year;
        // console.log(year);
      });
    });
  
  // var int date=year
  db.collection("posts").add({
    content: content,
    batch: year,
    email: userEmail,
    link: "",
    type: 0,
  });

  db.collection("posts").add({
    content: content,
    batch: year,
    email: userEmail,
    link: "",
    type: 0,
  });
});

document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut();
});

auth.onAuthStateChanged((user) => {
  if (user) {
    userEmail = user.email; // Retrieve the email address
    console.log("User logged in. Email address:", userEmail);
    
  } else {
    window.location.href = "/";
    console.log("user logged out");
  }
});
