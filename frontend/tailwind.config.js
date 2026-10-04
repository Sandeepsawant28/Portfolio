import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-black/20 backdrop-blur-md text-white">
      <div className="text-xl font-bold">MyPortfolio</div>
      <ul className="flex gap-6">
        <li className="hover:text-cyan-300 cursor-pointer transition">Home</li>
        <li className="hover:text-cyan-300 cursor-pointer transition">About</li>
        <li className="hover:text-cyan-300 cursor-pointer transition">Skills</li>
        <li className="hover:text-cyan-300 cursor-pointer transition">Projects</li>
        <li className="hover:text-cyan-300 cursor-pointer transition">Testimonials</li>
        <li className="hover:text-cyan-300 cursor-pointer transition">Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar