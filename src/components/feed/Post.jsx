import Image from "next/image";
import Comments from "./Comments";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";

async function Post({ post }) {
  // console.log(posts);

  const { userId } = auth();

  return (
    <div className="flex flex-col gap-4">
      {/*.....USER...... */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt=""
            className="rounded-full w-10 h-10"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      {/*.....DESC...... */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              fill
              alt=""
              className="object-cover rounded-md"
            />
          </div>
        )}

        <p>{post.desc}</p>
      </div>
      {/*.....INTERACTION...... */}

      <Suspense fallback={"Loading...."}>
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNo={post._count.comments}
        />

        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
}

export default Post;
