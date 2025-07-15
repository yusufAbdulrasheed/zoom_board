import { ModeToggle } from "./ModeToggle"
import Link from "next/link"
import { BoxesIcon,  } from "lucide-react"
import { UserButton, SignedIn } from "@clerk/nextjs"
import DashboardBtn from "./DashboardBtn"

function Navbar() {
  return (
    <nav className="border-b">
        <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <BoxesIcon className="size-8 text-indigo-500" />
          <span className="bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
            ZoomBoard
          </span>
        </Link>

        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <UserButton />
            <ModeToggle />
            <DashboardBtn />
          </div>
        </SignedIn>

        </div>
    </nav>
  )
}

export default Navbar