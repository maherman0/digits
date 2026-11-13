'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';

const ContactCard = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center gap-3">
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={75}
        roundedCircle
      />
      <div>
        <Card.Title>
          {contact.firstName} {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="text-muted">
          {contact.address}
        </Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {contact.description}
      </Card.Text>
      <p className="blockquote-footer">
        {contact.owner}
      </p>
      <ListGroup variant="flush">
        {notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </ListGroup>
    </Card.Body>
  </Card>
);

export default ContactCard;
