"use client";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { switchLike } from "@/lib/actions";

function PostInteraction({ postId, likes, commentNo }) {
  const { userId } = useAuth();
  //   console.log(userId);

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  async function likeAction() {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center bg-slate-50 rounded-xl p-2 gap-4">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                width={16}
                height={16}
                alt=""
                className="cursor-pointer"
              />
            </button>
          </form>

          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        <div className="flex items-center bg-slate-50 rounded-xl p-2 gap-4">
          <Image
            src="/comment.png"
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNo}
            <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center bg-slate-50 rounded-xl p-2 gap-4">
          <Image
            src="/share.png"
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline">Share</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostInteraction;
