## Environment Variables Setup

This project uses environment variables to manage configuration values. To keep sensitive data out of the source code, environment variables are defined in an .env file, which is ignored by Git.

Set Up Environment Variables:
1. Copy the example file:
Run the following command in the root directory to create your own .env.local file:
cp .env.example .env.local

2. Edit .env.local:
Open the .env.local file and fill in the missing values:
NEXT_PUBLIC_IMAGE_URL=/images/
NEXT_PUBLIC_BACKEND_URL=your_backend_url
NEXT_PUBLIC_WS_URL=your_ws_url
NEXT_PUBLIC_WORDPRESS_URL=your_wordpress_url

3. Restart the Next.js server (if already running):
npm run dev

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
