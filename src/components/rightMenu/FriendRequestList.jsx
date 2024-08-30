"use client";
import Image from "next/image";
import { acceptFollowRequest, declineFollowRequest } from "../../lib/actions";
import { useState, useOptimistic } from "react";

function FriendRequestList({ senderDetails }) {
  // console.log(senderDetails);

  const [requeststate, setRequestState] = useState(senderDetails);

  async function accept(requestId, senderId) {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(senderId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function decline(requestId, senderId) {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(senderId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requeststate,
    (state, value) => state.filter((request) => request.id !== value)
  );

  return senderDetails.map((sender) => (
    <div key={sender.id} className="flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Image
          src={sender.avatar || "/noAvatar.png"}
          width={40}
          height={40}
          className="rounded-full object-cover w-10 h-10"
        />
        <span className="font-semibold">
          {sender.name && sender.surname
            ? sender.name + " " + sender.surname
            : sender.username}
        </span>
      </div>

      <div className="flex gap-3 justify-end">
        <form action={() => accept(192, sender.id)}>
          {/*here if u directly call accept (i.e., action = {accept(sender.id)})
          it performs the action in render phase itself causing unintended
          behaviour. you want it to call only when user performs action*/}
          <button>
            <Image
              src="/accept.png"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </form>

        <form action={() => decline(sender.id)}>
          <button>
            <Image
              src="/reject.png"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </form>
      </div>
    </div>
  ));
}

export default FriendRequestList;
