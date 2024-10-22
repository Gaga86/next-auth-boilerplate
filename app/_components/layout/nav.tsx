import Navbar from "./navbar";
import { auth } from "@/auth"
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "@/app/_components/auth/user-dropdown"
import { Button } from "@/app/_components/ui/button"

export default async function Nav() {
  const session = await auth();
  return (
    <Navbar>
      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
        <Link href="/" className="flex items-center font-display text-2xl">
          <Image
            src="/logo.webp"
            alt="logo"
            width="40"
            height="40"
            className="mr-2 rounded-sm"
          ></Image>
          <span className="ml-2 text-xl font-black">Next.js and Auth.js</span>
        </Link>
        <div>
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="flex items-center font-display text-2xl">
                <Button className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}
