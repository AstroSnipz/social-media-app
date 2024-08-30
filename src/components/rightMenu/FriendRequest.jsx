import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";

async function FriendRequest() {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;
  const friendRequests = await prisma.followRequest.findMany({
    where: {
      recieverId: currentUserId,
    },
    include: {
      sender: true,
    },
  });

  // console.log(friendRequests);

  const senderDetails = friendRequests.map((request) => request.sender);
  // console.log(senderDetails);

  if (friendRequests.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md text-sm">
      {/*....TOP....*/}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-sm">
          See all
        </Link>
      </div>

      <FriendRequestList senderDetails={senderDetails} />
    </div>
  );
}

export default FriendRequest;
