import Image from "next/image";
import Link from "next/link";

async function UserMediaCard({ user }) {
  const mediaPosts = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(mediaPosts);
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md text-sm">
      {/*....TOP....*/}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-sm">
          See all
        </Link>
      </div>

      {/*....BOTTOM....*/}
      <div className="flex gap-4 justify-start flex-wrap">
        {mediaPosts.length
          ? mediaPosts.map((post, index) => (
              <div key={index} className="relative w-1/5 h-24">
                <Image
                  src={post.img}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No media found!"}
      </div>
    </div>
  );
}

export default UserMediaCard;
