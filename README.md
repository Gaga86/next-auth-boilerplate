## Next.js & Auth.js boilerplate project
This is a [Next.js](https://nextjs.org/) project with authorization logic implemetent using [Auth.js](https://authjs.dev/)
It uses [Tailwind CSS](https://tailwindcss.com/), ESLint, TypeScript and App Router.

## Styling

Signup and Login components are styled with Tailwind, and use custom UI components (Button, Input and Label) defined in @/app/_components/ui folder. For styling these components, the following dependencies were installed:

```bash
npm install class-variance-authority clsx tailwind-merge @radix-ui/react-label
```

## Getting Started

1. Install the database.

This project uses Prisma ORM with MySQL database.
Connection string must be specified under the DATABASE_URL .env variable. More about connection string formats [here](https://www.prisma.io/docs/orm/reference/connection-urls).

2. Install the dependencies

```bash
npm install
```

3. Run the prisma migration:

```bash
npx prisma migrate dev --name init
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
