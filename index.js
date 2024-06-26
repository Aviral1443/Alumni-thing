// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const firebaseConfig = {
  apiKey: "AIzaSyApIj5vsg7mHvlFsXFQRSAbKwjX_sLFnFA",
  authDomain: "bit-wizards.firebaseapp.com",
  projectId: "bit-wizards",
  storageBucket: "bit-wizards.appspot.com",
  messagingSenderId: "851573876220",
  appId: "1:851573876220:web:d7c398f50bc45456f4be79",
  measurementId: "G-0Z5G3EXV79"
};

//const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/check-login", (req, res) => {
  console.log(req.body);
})

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/search", (req, res) => {
  console.log(req.body);
  res.render("search.ejs");
});

app.post("/check-register", (req, res) => {
  console.log(req.body);
})

app.get("/home", (req, res) => {
  res.render("homepage.ejs");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "Passworc@1",
//   port: 5432,
// });
// db.connect();
// let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

// async function checkVisisted() {
//   const result = await db.query(
//     "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
//     [currentUserId]
//   );
//   let countries = [];
//   result.rows.forEach((country) => {
//     countries.push(country.country_code);
//   });
//   return countries;
// }

// async function getCurrentUser() {
//   const result = await db.query("SELECT * FROM users");
//   users = result.rows;
//   return users.find((user) => user.id == currentUserId);
// }

// app.get("/", async (req, res) => {
//   const countries = await checkVisisted();
//   const currentUser = await getCurrentUser();
//   res.render("index.ejs", {
//     countries: countries,
//     total: countries.length,
//     users: users,
//     color: currentUser.color,
//   });
// });
// app.post("/add", async (req, res) => {
//   const input = req.body["country"];
//   const currentUser = await getCurrentUser();

//   try {
//     const result = await db.query(
//       "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
//       [input.toLowerCase()]
//     );

//     const data = result.rows[0];
//     const countryCode = data.country_code;
//     try {
//       await db.query(
//         "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
//         [countryCode, currentUserId]
//       );
//       res.redirect("/");
//     } catch (err) {
//       console.log(err);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/user", async (req, res) => {
//   if (req.body.add === "new") {
//     res.render("new.ejs");
//   } else {
//     currentUserId = req.body.user;
//     res.redirect("/");
//   }
// });

// app.post("/new", async (req, res) => {
//   const name = req.body.name;
//   const color = req.body.color;

//   const result = await db.query(
//     "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
//     [name, color]
//   );

//   const id = result.rows[0].id;
//   currentUserId = id;

//   res.redirect("/");
// });
