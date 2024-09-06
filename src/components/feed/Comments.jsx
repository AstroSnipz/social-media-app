import { auth } from "@clerk/nextjs/server";
import CommentList from "./CommentList";
import prisma from "@/lib/client";

async function Comments({ postId }) {
  const { userId } = auth();
  // console.log(userId);

  const currentUserDetails = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  // console.log(comments);

  return (
    <div>
      <CommentList
        comments={comments}
        postId={postId}
        user={currentUserDetails}
      />
    </div>
  );
}

export default Comments;
