import { useState, useEffect } from "react";
import { Container, Paper, Button, TextField } from "@mui/material";

export default function Student() {
  const paperStyle = {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
  };
// useState used to store and update data inside a React component.
// function to update value of name is setName and initial value of name is empty string. 
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();

    const student = { name, address };

    fetch("http://localhost:9090/student/add", { //url of the backend api to add new student in the database
      method: "POST",
            // We set the content type of the http request header to application/json because we send the student object as JSON string in the http request body 
            // and the backend expects the http request body in JSON format
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student), // Convert student object to JSON string because we send as http request body that only accepts string data
    //{
   //      "name": "John",
  //       "address": "Texas"
   //} this is the format of the student object that we send to the backend as http request body and it is converted in javascript string format by JSON.stringify() method
   //{
   //      name: "John",
   //      address: "Texas"
   //}this is java script string format of the student object 
    }).then(() => {
      console.log("New Student added");
      fetchStudents();// After adding new student we fetch all students from the database 
    });
  };

  const fetchStudents = () => {
    fetch("http://localhost:9090/student/getAll")
      .then((res) => res.json()) // convert response to JSON because the backend sends the response in JSON format a
      .then((result) => setStudents(result)); // this line takes data from backend and stores it in React so it can be shown in the UI.
  };

  // Run this code when the page loads
  useEffect(() => {
    fetchStudents();
  }, []); // empty dependency array means this code will run only once when the page loads

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Add Student</u>
        </h1>

        <form>
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: 10 }}
          />

          <TextField
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: 10 }}
          />

          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>

      <h1>Students</h1>

      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            key={student.id}
            elevation={6}
            style={{ margin: 10, padding: 15, textAlign: "left" }}
          >
            Id: {student.id}
            <br />
            Name: {student.name}
            <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
