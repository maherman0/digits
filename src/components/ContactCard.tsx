'use client';

import { Card, Image } from 'react-bootstrap';
import type { Contact } from '@prisma/client';

const ContactCard = ({ contact }: { contact: Contact }) => (
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
    </Card.Body>
  </Card>
);

export default ContactCard;
