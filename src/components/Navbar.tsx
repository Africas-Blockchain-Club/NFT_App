'use client';



export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 fixed w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-white">❤️</span>
          </div>
          <span className="text-gray-700 text-xl font-bold">CharityNFT</span>
        </div>
        <div className="flex space-x-4">
           
          
            <>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Sign Up
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Login
              </button>
            </>
          
        </div>
      </div>
    </nav>
  );
}