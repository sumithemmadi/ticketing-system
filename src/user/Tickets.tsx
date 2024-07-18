import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "../components/Title";
import { TicketType } from "../context/AuthContext";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Tickets({ tickets }: { tickets: TicketType[] }) {
  return (
    <React.Fragment>
      {tickets.length > 0 ? (
        <>
          <Title>Tickets</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Open At</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.openAt}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.department}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" color="primary">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link
            color="primary"
            href="#"
            onClick={preventDefault}
            sx={{ mt: 3 }}
          >
            See more tickets
          </Link>
        </>
      ) : (
        <Title>No tickets found</Title>
      )}
    </React.Fragment>
  );
}
