export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Support Charities with <span className="text-pink-400">Zero-Friction</span> NFT Purchases
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            Buy beautiful digital art NFTs while supporting your favorite causes. We cover gas fees so you can donate seamlessly.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.location.href = '/Collection'}
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center"
            >
              <span className="mr-2">💎</span> Explore NFTs
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-80 h-80">
            <div className="absolute top-0 left-0 w-full h-full bg-purple-500 rounded-2xl shadow-2xl transform rotate-6"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-pink-500 rounded-2xl shadow-2xl transform -rotate-6"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center p-4">
              <div className="text-center text-white">
                <span className="text-5xl mb-4">❤️</span>
                <h3 className="text-2xl font-bold mb-2">Hope for Children</h3>
                <p className="text-sm">100% of proceeds go to support education initiatives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}