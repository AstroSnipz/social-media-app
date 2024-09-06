"use client";
import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

function PostInfo({ postId }) {
  const [open, setOpen] = useState(false);

  function del() {
    deletePost(postId);
  }
  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={(prev) => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <form action={del}>
            <button>
              <span className="text-red-500">Delete</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostInfo;
