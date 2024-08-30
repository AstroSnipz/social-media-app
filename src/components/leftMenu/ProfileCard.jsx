import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import prisma from "../../lib/client";

async function ProfileCard() {
  const { userId } = auth();

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    }, //The include option is used to specify relations and fields that should be fetched along with the main query.
    include: {
      //_count is a special field in Prisma that allows you to count related records.
      _count: {
        select: { followers: true },
      },
    },
  });
  // console.log(userData);

  if (!userData) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="relative h-20">
        <Image
          src={userData.cover || "/noCover.png"}
          alt=""
          fill
          className="object-cover rounded-md"
        />
        <Image
          src={userData.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="object-cover rounded-full absolute w-12 h-12 -bottom-6 m-auto left-0 right-0 ring-1 ring-white"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {userData.name && userData.surname
            ? userData.name + " " + userData.surname
            : userData.username}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src={userData.avatar}
              width={12}
              height={12}
              className="w-3 h-3 rounded-full object-cover"
            />
            <Image
              src={userData.avatar}
              width={12}
              height={12}
              className="w-3 h-3 rounded-full object-cover"
            />
            <Image
              src={userData.avatar}
              width={12}
              height={12}
              className="w-3 h-3 rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-500">
            {userData._count.followers} followers
          </span>
        </div>
        <button className="bg-blue-500 text-xs text-white p-2 rounded-md">
          My Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
