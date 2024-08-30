import Image from "next/image";
import Comments from "./Comments";

function Post() {
  return (
    <div className="flex flex-col gap-4">
      {/*.....USER...... */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/14980647/pexels-photo-14980647/free-photo-of-man-in-messi-jersey-celebrating-winning-fifa-world-cup-2022-on-street-of-buenos-aires-argentina.jpeg?auto=compress&cs=tinysrgb&w=600"
            width={40}
            height={40}
            alt=""
            className="rounded-full w-10 h-10"
          />
          <span className="font-medium">Messi</span>
        </div>
        <Image src="/more.png" width={16} height={16} alt="" />
      </div>
      {/*.....DESC...... */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/15810418/pexels-photo-15810418/free-photo-of-gamepad-on-argentina-national-football-team-jersey.jpeg?auto=compress&cs=tinysrgb&w=600"
            fill
            alt=""
            className="object-cover rounded-md"
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          reiciendis modi doloremque, quasi quibusdam commodi architecto
          voluptatibus consequuntur quae mollitia repellat quis dignissimos,
          iusto, fugiat provident? Libero temporibus voluptatem quos.
        </p>
      </div>
      {/*.....INTERACTION...... */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center bg-slate-50 rounded-xl p-2 gap-4">
            <Image
              src="/like.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Likes</span>
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
              123<span className="hidden md:inline"> Comments</span>
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
              123<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
}

export default Post;
