import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return(
    <div className="flex items-center justify-center flex-col">
        <SignUp />
    </div>
  ) 
}