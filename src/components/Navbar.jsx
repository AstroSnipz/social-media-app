import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/nextjs";

function Navbar() {
  return (
    <div className="top-0 left-0 right-0 h-24 bg-white flex items-center justify-between z-50 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link
          href="/"
          className="font-bold text-xl bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 text-transparent bg-clip-text"
        >
          SnapNest
        </Link>
      </div>

      {/* center */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="HomePage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="font-bold text-black">HomePage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt="FriendPage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="font-bold text-black">Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              alt="StoriesPage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="font-bold text-black">Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl ml-4">
          {" "}
          {/* Added ml-4 for spacing */}
          <input
            type="text"
            placeholder="search...."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="search" width={14} height={14} />
        </div>
      </div>

      {/* right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="people" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image
                src="/messages.png"
                alt="messages"
                width={20}
                height={20}
              />
            </div>
            <div className="cursor-pointer">
              <Image
                src="/notifications.png"
                alt="notifications"
                width={20}
                height={20}
              />
            </div>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src="/login.png" alt="login" width={20} height={20} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
}

export default Navbar;
