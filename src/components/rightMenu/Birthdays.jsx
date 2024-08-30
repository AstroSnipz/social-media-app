import Image from "next/image";
import Link from "next/link";
function Birthdays() {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md text-sm">
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src="https://images.pexels.com/photos/26752880/pexels-photo-26752880/free-photo-of-photo-of-a-young-woman-standing-under-a-white-sheet-in-blue-lighting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
          />
          <span className="font-semibold">Jennifer</span>
        </div>
        <div className="flex justify-end gap-3">
          <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            Celebrate
          </button>
        </div>
      </div>

      {/*...UPCOMING BIRTHDAYS....*/}
      <div className="flex bg-slate-100 rounded-lg items-center p-4 gap-4">
        <Image src="/gift.png" width={24} height={24} />
        <Link href="" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">See other 16 upcoming birthdays</span>
        </Link>
      </div>
    </div>
  );
}

export default Birthdays;
