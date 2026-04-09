# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Supabase Database Setup

Admin content is now stored in Supabase Postgres.

1. Create a `.env.local` file.
2. Add `DATABASE_URL` using your Supabase pooler connection string.
3. URL-encode special characters in the password (for example, `@` becomes `%40`).

Example:

```env
DATABASE_URL=postgresql://postgres.nhdskuxlvvtzswbopeaj:YOUR_URL_ENCODED_PASSWORD@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres
```

The app auto-creates the `admin_content` table on first use.
