export default function TechnologyStack() {
  return (
    <section id="tech" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Powered by Cutting-Edge Technology</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          We use the latest blockchain innovations to make charitable giving seamless and secure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center text-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20">
            <div className="text-4xl mb-4">⚒️</div>
            <h3 className="text-2xl font-bold mb-4">Foundry</h3>
            <p className="text-gray-700">Smart contract development framework for secure, tested, and gas-efficient contracts.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center text-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20">
            <div className="text-4xl mb-4">🔑</div>
            <h3 className="text-2xl font-bold mb-4">ZeroDev</h3>
            <p className="text-gray-700">Account abstraction powered by ZeroDev for gasless transactions and social logins.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center text-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20">
            <div className="text-4xl mb-4">☁️</div>
            <h3 className="text-2xl font-bold mb-4">IPFS/Pinata</h3>
            <p className="text-gray-700">Decentralized storage for NFT metadata and assets, ensuring permanence and accessibility.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center text-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-2xl font-bold mb-4">Scroll Sepolia</h3>
            <p className="text-gray-700">Ethereum Layer 2 solution for scalable, low-cost transactions with Ethereum-level security.</p>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-br from-pink-800/30 to-purple-800/30 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">How Account Abstraction Helps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-full p-3 mr-4 flex-shrink-0">
              </div>
              <div>
                <h4 className="text-gray-800 text-lg font-bold mb-2">Gasless Transactions</h4>
                <p className="text-gray-700">We cover all transaction fees so you can focus on supporting causes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="text-white text-lg">👤</span>
              </div>
              <div>
                <h4 className="text-gray-800 text-lg font-bold mb-2">Social Logins</h4>
                <p className="text-gray-700">Sign in with familiar methods - no seed phrases or private keys to manage.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="text-white text-lg">🛡️</span>
              </div>
              <div>
                <h4 className="text-gray-800 text-lg font-bold mb-2">Enhanced Security</h4>
                <p className="text-gray-700">Multi-factor authentication and transaction security built into the protocol.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="text-white text-lg">⚡</span>
              </div>
              <div>
                <h4 className="text-gray-800 text-lg font-bold mb-2">Batch Transactions</h4>
                <p className="text-gray-700">Multiple actions combined into one transaction for efficiency and simplicity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}