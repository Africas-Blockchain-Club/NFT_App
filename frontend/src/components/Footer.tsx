// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white">❤️</span>
              </div>
              <span className="text-white text-xl font-bold">CharityNFT</span>
            </div>
            <p className="mt-2">Making charitable giving accessible through technology</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Discord</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>© 2023 CharityNFT. All rights reserved. Built with ❤️ for a better world.</p>
        </div>
      </div>
    </footer>
  );
}