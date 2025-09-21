import ScopeButton from '@/components/UnrealButton';

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
          
          <div className="flex space-x-4">
            <ScopeButton 
              message="Social media integration is outside the current project scope"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </ScopeButton>
            <ScopeButton 
              message="Community platform integration is outside the current project scope"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Discord
            </ScopeButton>
            <ScopeButton 
              message="Social media integration is outside the current project scope"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </ScopeButton>
            <ScopeButton 
              message="Code repository integration is outside the current project scope"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </ScopeButton>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>© 2023 CharityNFT. All rights reserved. Built with ❤️ for a better world.</p>
        </div>
      </div>
    </footer>
  );
}