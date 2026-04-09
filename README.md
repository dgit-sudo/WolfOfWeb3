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

## Supabase Storage Setup (Video Uploads)

To upload videos from the admin panel in production, configure Supabase Storage:

1. Create a bucket named `admin-uploads` in Supabase Storage.
2. Set the bucket visibility to Public.
3. Add this environment variable:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Optional (only needed if project ref cannot be derived from `DATABASE_URL`):

```env
NEXT_PUBLIC_SUPABASE_PROJECT_REF=your_project_ref
```
