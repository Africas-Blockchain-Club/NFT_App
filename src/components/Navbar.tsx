'use client';



export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 fixed w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-white">❤️</span>
          </div>
          <span className="text-white text-xl font-bold">CharityNFT</span>
        </div>
        <div className="flex space-x-4">
           
          
            <>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Sign Up
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Login
              </button>
            </>
          
        </div>
      </div>
    </nav>
  );
}