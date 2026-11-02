
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';
import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seed users
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;

    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        password,
      },
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  
    console.log('Number of contacts:', config.defaultContacts.length);

    for (const [index, contact] of config.defaultContacts.entries()) {
      console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);

      await prisma.contact.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          address: contact.address,
          image: contact.image,
          description: contact.description,
          owner: contact.owner,
        },
      });
    }

  }

  // Seed contacts
  for (const [index, contact] of config.defaultContacts.entries()) {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);

    await prisma.contact.upsert({
      where: { id: index + 1 },
      update: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });
  }


main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
