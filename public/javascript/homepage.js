var userEmail = "";
let year;
uri = "";
var fileFlag = 0;

document.getElementById("post-btn").addEventListener("click", () => {
  console.log(fileFlag);
  if ((fileFlag !=0)) {
    content = document.getElementById("content").value;
    const storageRef = storage.ref().child("myimages");
    const folderRef = storageRef.child(fileName);
    const uploadtask = folderRef.put(file);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        console.log("Snapshot", snapshot.ref.name);
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress = Math.round(progress);
        progressbar.style.width = progress + "%";
        progressbar.innerHTML = progress + "%";
        uploadedFileName = snapshot.ref.name;
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("myimages")
          .child(uploadedFileName)
          .getDownloadURL()
          .then((url) => {
            console.log("URL", url);
            uri = url;

            db.collection("posts").add({
              content: content,
              batch: year,
              email: userEmail,
              link: uri,
              time: firebase.firestore.FieldValue.serverTimestamp(),
              type: 0,
            });
            // if (!url) {
            //   img.style.display = "none";
            // } else {
            //   img.style.display = "block";
            //   loading.style.display = "none";
            // }
            // img.setAttribute("src", url);
          });
        console.log("File Uploaded Successfully");
      }
    );
  }
  else{
    content = document.getElementById("content").value;
    db.collection("posts").add({
      content: content,
      batch: year,
      email: userEmail,
      link: "",
      time: firebase.firestore.FieldValue.serverTimestamp(),
      type: 0,
    });
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut();
});

auth.onAuthStateChanged((user) => {
  if (user) {
    userEmail = user.email; // Retrieve the email address
    db.collection("users")
      .where("email", "==", userEmail)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          year = doc.data().year;
          // console.log(year);
        });
      });
    console.log("User logged in. Email address:", userEmail);
  } else {
    window.location.href = "/";
    console.log("user logged out");
  }
});

const inp = document.querySelector(".inp");
const progressbar = document.querySelector(".progress");
const img = document.querySelector(".img");
const fileData = document.querySelector(".filedata");
const loading = document.querySelector(".loading");
let file;
let fileName;
let progress;
let isLoading = false;
let uploadedFileName;
const selectImage = () => {
  inp.click();
};

const getImageData = (e) => {
  file = e.target.files[0];
  fileName = Math.round(Math.random() * 9999) + file.name;
  if (fileName) {
    fileData.style.display = "block";
  }
  fileData.innerHTML = fileName;
  console.log(file, fileName);
  fileFlag = 1;
};
