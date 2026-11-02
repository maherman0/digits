
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import EditContactForm from '@/components/EditContactForm';

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const { id } = await params;
  const contactId = Number(id);

  if (!Number.isInteger(contactId) || contactId < 1) {
    notFound();
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}
