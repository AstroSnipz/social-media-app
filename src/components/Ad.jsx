import Image from "next/image";

function Ad({ size }) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md text-sm">
      {/*....TOP....*/}
      <div className="flex items-center justify-between font-medium text-gray-500">
        <span className="text-gray-500">Sponsored Ads</span>
        <Image
          src="/more.png"
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div className={`relative w-full ${size === "sm" ? "h-24" : "h-48"}`}>
          <Image
            src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-coconut-drink-on-hand.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            fill
            alt=""
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/19068966/pexels-photo-19068966/free-photo-of-coconut-drink-on-hand.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 object-cover rounded-full"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={`${size === "sm" ? "text-xs" : "text-sm"}`}>
          {`${
            size === "sm"
              ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              : size === "md"
              ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }`}
        </p>
        <button className="bg-gray-200 text-gray-500 p-4 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
}

export default Ad;
