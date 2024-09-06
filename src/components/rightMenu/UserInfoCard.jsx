import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";
import prisma from "@/lib/client";

async function UserInfoCard({ user }) {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blocksRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    if (blocksRes ? (isUserBlocked = true) : (isUserBlocked = false));

    const followingRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    if (followingRes ? (isFollowing = true) : (isFollowing = false));

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        recieverId: user.id,
      },
    });
    if (followReqRes ? (isFollowingSent = true) : (isFollowingSent = false));
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md text-sm">
      {/*....TOP....*/}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-blue-500 text-sm">
            See all
          </Link>
        )}
      </div>

      {/*.....BOTTOM.....*/}
      <div className="flex flex-col gap-4  text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" width={16} height={16} className="w-4 h-4" />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image
              src="/school.png"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" width={16} height={16} className="w-4 h-4" />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" width={16} height={16} />
              <Link href="/" className="text-blue-500 font-medium">
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Image src="/date.png" width={16} height={16} />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        {currentUserId &&
          currentUserId !== user.id && ( // this checks if the currentUserId exists(i.e user is authenticated) and if the current user searches his own page we should not show this component(i.e., follow and block button)
            <UserInfoCardInteraction
              currentUserId={currentUserId}
              userId={user.id}
              isUserBlocked={isUserBlocked}
              isFollowing={isFollowing}
              isFollowingSent={isFollowingSent}
            />
          )}
      </div>
    </div>
  );
}

export default UserInfoCard;
