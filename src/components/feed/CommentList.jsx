"use client";

import Image from "next/image";
import { createComment } from "@/lib/actions";
import { useOptimistic, useState } from "react";

function CommentList({ comments, postId, user }) {
  // console.log(user);

  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  async function testAction() {
    if (!user || !desc) return;
    addOptimisticComments({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending please wait....",
        avatar: user.avatar || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdComment = await createComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
      setDesc("");
    } catch (err) {}
  }

  const [optimisticComments, addOptimisticComments] = useOptimistic(
    commentState,
    (state, value) => [value, ...state]
  );

  return (
    <>
      {/*....WRITE....*/}
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.avatar || "/noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <form
            action={testAction}
            className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment...."
              className="bg-transparent outline-none flex-1"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer self-end"
            />
          </form>
        </div>
      )}

      {/*....COMMENTS....*/}
      {optimisticComments.map((comment) => (
        <div key={comment.id} className="flex gap-4 justify-between mt-6">
          {/*....AVATAR....*/}

          <Image
            src={comment.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />

          {/*....DESC....*/}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">
              {comment.user.name && comment.user.surname
                ? comment.user.name + " " + comment.user.surname
                : comment.user.username}
            </span>
            <p>{comment.desc}</p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">
                  {comment.likes ? comment.likes.length : 0} Likes
                </span>
              </div>
              <div>Reply</div>
            </div>
          </div>
          {/*....ICON....*/}
          <Image
            src="/more.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer w-4 h-4"
          />
        </div>
      ))}
    </>
  );
}

export default CommentList;
