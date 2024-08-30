"use server";

import { auth } from "@clerk/nextjs/server";
import z from "zod";

async function switchFollow(userId) {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }
  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          recieverId: userId,
        },
      });
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            recieverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}

async function switchBlock(userId) {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}

async function acceptFollowRequest(userId) {
  console.log(userId);
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        recieverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}

async function declineFollowRequest(userId) {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }
  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        recieverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}

export async function updateProfile(prevState, payload) {
  const { success, error } = prevState;
  const { formData, cover } = payload;

  const feilds = Object.fromEntries(formData); // Convert formData to object for easy access
  console.log(feilds);

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFeilds = Profile.safeParse({ cover, ...feilds });

  if (!validatedFeilds.success) {
    console.log(validatedFeilds.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    return { success: false, error: true };
  }

  const existingDetails = await prisma.user.findFirst({
    where: {
      id: currentUserId,
    },
  });

  try {
    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        cover: validatedFeilds.data.cover || existingDetails.cover, // there is a better way to do this! (filter method), refer video
        name: validatedFeilds.data.name || existingDetails.name,
        surname: validatedFeilds.data.surname || existingDetails.surname,
        description:
          validatedFeilds.data.description || existingDetails.description,
        city: validatedFeilds.data.city || existingDetails.city,
        school: validatedFeilds.data.school || existingDetails.school,
        work: validatedFeilds.data.work || existingDetails.work,
        website: validatedFeilds.data.website || existingDetails.website,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
}

export { switchFollow, switchBlock, acceptFollowRequest, declineFollowRequest };
