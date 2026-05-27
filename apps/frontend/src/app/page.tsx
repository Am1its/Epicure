import type { User } from '@org/shared-types';

// Prevent Next.js from prerendering this page at build time.
// This page calls an external HTTP endpoint, which may not be running during `next build`.
export const dynamic = 'force-dynamic';

async function UserPage({ params }: { params?: { id?: string } }) {
  const userId = params?.id;
  if (!userId) return <div>Missing user id</div>;

  const user: User = await fetch(`http://localhost:3333/users/${userId}`, {
    // Ensure fresh data on each request.
    cache: 'no-store',
  }).then((res) => res.json());

  return <div>{user.name}</div>;
}

export default UserPage;
