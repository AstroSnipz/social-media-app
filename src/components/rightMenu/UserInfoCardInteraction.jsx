"use client";
import { useOptimistic, useState } from "react";
import { switchFollow, switchBlock } from "../../lib/actions";

function UserInfoCardInteraction({
  currentUserId,
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestsent: isFollowingSent,
  });
  async function follow() {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev, // Spread the previous state to maintain other properties
        following: prev.following && false, //following is set to false if prev.following is true. This implies that the user was previously following the target user and now has unfollowed.
        followingRequestsent:
          !prev.following && !prev.followingRequestsent ? true : false, //i.e if we are not following and we hve not sent any request, then if the button triggers then followingRequestsent will be set to true else it will be set to false.
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const [optimisticstate, switchOptimisticState] = useOptimistic(
    userState,
    (state, value) =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestsent:
              !state.following && !state.followingRequestsent ? true : false,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );

  async function block() {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm p-2 rounded-md">
          {optimisticstate.following
            ? "Following"
            : optimisticstate.followingRequestsent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>

      <form action={block} className="self-end">
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticstate.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
}

export default UserInfoCardInteraction;
