import Image from "next/image";

function Comments() {
  return (
    <div>
      {/*....WRITE....*/}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/14980647/pexels-photo-14980647/free-photo-of-man-in-messi-jersey-celebrating-winning-fifa-world-cup-2022-on-street-of-buenos-aires-argentina.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment...."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer self-end"
          />
        </div>
      </div>
      {/*....COMMENTS....*/}
      <div className="">
        <div className="flex gap-4 justify-between mt-6">
          {/*....AVATAR....*/}
          <div>
            <Image
              src="https://images.pexels.com/photos/14980647/pexels-photo-14980647/free-photo-of-man-in-messi-jersey-celebrating-winning-fifa-world-cup-2022-on-street-of-buenos-aires-argentina.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
          {/*....DESC....*/}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Dustin Davis</span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
              ducimus eaque nemo ad, eius deleniti sit itaque voluptatem
              cupiditate suscipit soluta non iste distinctio aut, dignissimos
              consequuntur saepe eligendi ut.
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
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
      </div>
    </div>
  );
}

export default Comments;
