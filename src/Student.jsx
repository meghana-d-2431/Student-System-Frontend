import { useState, useEffect } from "react";
import { Container, Paper, Button, TextField } from "@mui/material";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090";

export default function Student() {
  const paperStyle = {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();

    const student = { name, address };

    fetch(`${API_BASE_URL}/student/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
      setName("");
      setAddress("");
      fetchStudents();
    });
  };

  const fetchStudents = () => {
    fetch(`${API_BASE_URL}/student/getAll`)
      .then((res) => res.json())
      .then((result) => setStudents(result));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
            inputProps={{ "data-testid": "student-name-input" }}
          />

          <TextField
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: 10 }}
            inputProps={{ "data-testid": "student-address-input" }}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            data-testid="submit-student-button"
          >
            Submit
          </Button>
        </form>
      </Paper>

      <h1>Students</h1>

      <Paper elevation={3} style={paperStyle} data-testid="students-list">
        {students.map((student) => (
          <Paper
            key={student.id}
            elevation={6}
            style={{ margin: 10, padding: 15, textAlign: "left" }}
            data-testid="student-card"
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
