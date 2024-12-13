import Logo from "../assets/logo.png"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <div className="max-w-7xl w-full justify-between flex items-center my-4 px-4 lg:px-2 absolute bottom-0">
    <Link
          href="/"
          className="text-xs lg:text-base text-primary font-bold"
    >
        Craft & Stitch
    </Link>
    <div className="flex justify-end items-center">
      <div className="flex flex-row md:gap-2 gap-4 lg:gap-6">
        <Link
          href="/privacy"
          className="text-xs lg:text-base text-primary font-bold"
        >
          Privacy policy
        </Link>
        <Link
          href="/terms"
          className="text-xs lg:text-base text-primary font-bold"
        >
          Terms & Conditions
        </Link>
        <Link
          href="/about"
          className="text-xs lg:text-base text-primary font-bold"
        >
          About
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Footer