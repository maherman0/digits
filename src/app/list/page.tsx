import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import ContactCard from '@/components/ContactCard';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
  });
  // console.log(stuff);
  return (
    <main>
      <Container id="list" className="py-3">
        <h1 className="text-center">List Contacts</h1>
        <Row className="mt-3 g-3">
          {contacts.map((contact) => (
            <Col key={contact.id} xs={12} md={6} lg={4}>
              <ContactCard
                contact={contact}
                notes={notes.filter((note) => note.contactId === contact.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};
export default ListPage;
