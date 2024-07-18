import React, { useState, FormEvent } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Container,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { TicketType } from "../context/AuthContext";
import moment from "moment";

interface AddTicketProps {
  onAddTicket: (ticket: TicketType) => void;
}

const AddTicket: React.FC<AddTicketProps> = ({ onAddTicket }) => {
  const [subject, setSubject] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [id, setId] = useState<string>(uuidv4());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTicket: TicketType = {
      subject,
      openAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      department,
      message,
      status: "open",
      id,
    };
    onAddTicket(newTicket);
    setSubject("");
    setDepartment("");
    setMessage("");
    setId(uuidv4());
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="ID"
              variant="outlined"
              fullWidth
              value={id}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value as string)}
                label="Department"
                required
              >
                <MenuItem value="admin_department1">
                  Admin Department 1
                </MenuItem>
                <MenuItem value="admin_department2">
                  Admin Department 2
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Ticket
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddTicket;
