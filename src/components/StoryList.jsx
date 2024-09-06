"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { format } from "path";
import { addStory } from "@/lib/actions";

function StoryList({ stories }) {
  console.log(stories);

  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState(null);
  const { user, isLoaded } = useUser();

  const [optimisticStory, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value) => {
      return [value, ...state];
    }
  );

  if (!user && !isLoaded) return "Loading....";
  if (!user && isLoaded) return null;

  async function add() {
    if (!img.secure_url) return;
    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: user.id,
      user: {
        id: user.id,
        username: "Sending....",
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
      const createdStory = await addStory(img);
      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (err) {}
  }

  return (
    <>
      {/* Add a Story */}
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result) => setImg(result.info)}
      >
        {({ open }) => (
          <div className="flex flex-col gap-2 items-center cursor-pointer relative">
            <Image
              src={img?.secure_url || user.imageUrl || "/noAvatar.png"}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2"
            />
            {img ? (
              <form action={add}>
                {" "}
                <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                  Send
                </button>
              </form>
            ) : (
              <span className="font-medium">Add a Story</span>
            )}
            <div
              className="absolute text-6xl text-gray-200 top-1"
              onClick={() => open()}
            >
              +
            </div>
          </div>
        )}
      </CldUploadWidget>

      {/*List of Stories */}
      {optimisticStory.map((story) => (
        <div className="flex flex-col gap-2 items-center cursor-pointer">
          <Image
            src={story.img}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2 object-cover"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
}

export default StoryList;
