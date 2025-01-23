import Link from "next/link"

const Navbar = () => {
  return (
    <header className="header">
      <Link
        href="./"
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <span className="text-blue-500">AH</span>
      </Link>
      <nav className="flex text-lg gap-7 font-medium">
        <Link href="./contact">Contact</Link>
      </nav>
    </header>
  )
}

export default Navbar
