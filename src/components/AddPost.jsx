import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

function AddPost() {
  const { userId } = auth();
  // console.log(userId);

  // async function testAction(formData) {
  //   "use server";

  //   if (!userId) {
  //     return;
  //   }
  //   const desc = formData.get("desc");
  //   try {
  //     const res = await prisma.post.create({
  //       data: {
  //         userId: userId,
  //         desc: desc,
  //       },
  //     });
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="flex bg-white p-4 shadow-md rounded-lg gap-4 justify-between text-sm">
      {/*.....avatar.....*/}
      <Image
        src="https://images.pexels.com/photos/26045360/pexels-photo-26045360/free-photo-of-underwater-view-of-a-swimming-orca.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/*....input and options..... */}
      <div className="flex-1">
        {/*.....text input..... */}
        <form action="" className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="bg-slate-100 rounded-lg flex-1 p-2"
            name="desc"
          ></textarea>
          <Image
            src="/emoji.png"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button>Submit</button>
        </form>

        {/*....post options..... */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addImage.png" width={20} height={20} />
            Photo
          </div>
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
  );
}

export default AddPost;
