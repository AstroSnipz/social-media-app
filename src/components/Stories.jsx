import Image from "next/image";

function Stories(){
    return(
        <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
            <div className="flex gap-8 w-max">
            {/*Story */}
                <div className="flex flex-col gap-2 items-center cursor-pointer">
                    <Image src="https://images.pexels.com/photos/26741255/pexels-photo-26741255/free-photo-of-a-man-in-a-suit-standing-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Sharon</span>
                </div>

                 {/*Story */}
                 <div className="flex flex-col gap-2 items-center cursor-pointer">
                    <Image src="https://images.pexels.com/photos/26741255/pexels-photo-26741255/free-photo-of-a-man-in-a-suit-standing-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Sharon</span>
                </div>

                 {/*Story */}
                 <div className="flex flex-col gap-2 items-center cursor-pointer">
                    <Image src="https://images.pexels.com/photos/26741255/pexels-photo-26741255/free-photo-of-a-man-in-a-suit-standing-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Sharon</span>
                </div>

                 {/*Story */}
                 <div className="flex flex-col gap-2 items-center cursor-pointer">
                    <Image src="https://images.pexels.com/photos/26741255/pexels-photo-26741255/free-photo-of-a-man-in-a-suit-standing-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Sharon</span>
                </div>

                 {/*Story */}
                 <div className="flex flex-col gap-2 items-center cursor-pointer">
                    <Image src="https://images.pexels.com/photos/26741255/pexels-photo-26741255/free-photo-of-a-man-in-a-suit-standing-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Sharon</span>
                </div>

                 {/*Story */}
                 <div className="flex flex-col gap-2 items-center cursor-pointer">
                    <Image src="https://images.pexels.com/photos/26741255/pexels-photo-26741255/free-photo-of-a-man-in-a-suit-standing-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width={80} height={80} className="w-20 h-20 rounded-full ring-2"/>
                    <span className="font-medium">Sharon</span>
                </div>
            </div>
        </div>
    )
}

export default Stories;