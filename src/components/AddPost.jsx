"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
import AddPostButton from "./rightMenu/AddPostButton";
import { addPost } from "@/lib/actions";
import { useFormState } from "react-dom";

function AddPost() {
  const { user, isLoaded } = useUser();
  const [img, setImg] = useState(null);
  const [desc, setDesc] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [state, formAction] = useFormState(addPost, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success || state.error) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.success, state.error]);

  if (!isLoaded) {
    return "Loading....";
  }

  function testAction(formData) {
    formAction({ formData, img: img?.secure_url || "" });
    setDesc("");
  }

  return (
    <div className="relative">
      <div className="flex bg-white p-4 shadow-md rounded-lg gap-4 justify-between text-sm">
        {/*.....avatar.....*/}
        <Image
          src={user.imageUrl || "/noAvatar.png"}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/*....input and options..... */}
        <div className="flex-1">
          {/*.....text input..... */}
          <form action={testAction} className="flex gap-4">
            <textarea
              placeholder="What's on your mind?"
              className="bg-slate-100 rounded-lg flex-1 p-2"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <div>
              <Image
                src="/emoji.png"
                width={20}
                height={20}
                className="w-5 h-5 cursor-pointer self-end"
              />
              <AddPostButton />
            </div>
          </form>

          {/*....post options..... */}
          <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
            {/* COVER PIC UPLOAD */}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setImg(result.info)}
            >
              {({ open }) => (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/addImage.png" width={20} height={20} />
                  Photo
                </div>
              )}
            </CldUploadWidget>

            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/addVideo.png" width={20} height={20} />
              Video
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/poll.png" width={20} height={20} />
              Poll
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/addEvent.png" width={20} height={20} />
              Event
            </div>
          </div>
        </div>
      </div>

      {/* Success or Error message */}
      {showMessage && (
        <div
          className={`absolute top-[-40px] left-0 right-0 mx-auto w-max px-4 py-2 rounded-md text-white 
          ${state.success ? "bg-green-500" : "bg-red-500"} 
          transition-opacity duration-500 ease-in-out`}
        >
          {state.success ? "Post added successfully" : "Something went wrong"}
        </div>
      )}
    </div>
  );
}

export default AddPost;
