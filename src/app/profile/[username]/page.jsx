import LeftMenu from "../../../components/leftMenu/LeftMenu";
import Feed from "../../../components/feed/Feed";
import RightMenu from "../../../components/rightMenu/RightMenu";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

async function ProfilePage({ params }) {
  console.log(params);

  const userData = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!userData) return notFound();

  const { userId: currentUserId } = auth();

  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: userData.id,
        blockedId: currentUserId,
      },
    });
    if (res) {
      isBlocked = true;
    } else {
      isBlocked = false;
    }
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      {/*......LEFT...... */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      {/*......CENTER.......*/}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={userData.cover || "/noCover.png"}
                alt=""
                fill
                className="object-cover rounded-md"
              />
              <Image
                src={userData.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="object-cover absolute  w-32 h-32 rounded-full left-0 right-0 m-auto -bottom-16 ring-4 ring-white"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {userData.name && userData.surname
                ? userData.name + " " + userData.surname
                : userData.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{userData._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{userData._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">
                  {userData._count.followings}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed username={userData.username} />
        </div>
      </div>

      {/*......RIGHT........*/}
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={userData} />
      </div>
    </div>
  );
}

export default ProfilePage;
