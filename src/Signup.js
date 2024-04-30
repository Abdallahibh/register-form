import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  // function for prevent sending the data (if its uncompleted)
  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (name === "" || name.length < 8 || password !== rpassword) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.post("http://localhost:3001/users", {
          name: name,
          email: email,
          password: password,
          rpassword: rpassword,
        });
      }
    } catch (err) {
      setEmailError(err);
    }
  }
  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="name">Name : </label>
          <input
            id="name"
            type="text"
            placeholder="Name.."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          {name === "" && accept && (
            <p className="error">Username Is Required ..</p>
          )}
          <label htmlFor="email">Email : </label>
          <input
            id="email"
            type="email"
            placeholder="Email.."
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          {accept && emailError === 422 && (
            <p className="error">Email is already been taken</p>
          )}
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            type="password"
            placeholder="Password.."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          {password.length < 5 && accept && (
            <p className="error">
              Quote : Password must be more than 5 chars ..
            </p>
          )}
          <label htmlFor="Rpassword">Repeat password : </label>
          <input
            id="Repeat password"
            type="password"
            placeholder="Repeat password.."
            value={rpassword}
            onChange={(e) => {
              setRpassword(e.target.value);
            }}
          ></input>
          {rpassword !== password && accept && (
            <p className="error">Password Doesn't Match ..</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
