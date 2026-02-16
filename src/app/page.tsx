import prisma from '@/lib/prisma'

export default async function Home() {
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany({ include: { author: true } });
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-(family-name:--font-geist-sans) text-[#333333]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-(family-name:--font-geist-sans)">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            {post.title + " by " + post.author.name + " (" + post.author.email + ")" + " - " + post.content}
          </li>
        ))}
      </ol>
    </div>
  );
}