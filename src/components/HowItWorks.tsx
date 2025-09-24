// components/HowItWorks.tsx
export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">
          Support your favorite charities in three simple steps without worrying about gas fees or seed phrases.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">👤</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">1. Easy Sign Up</h3>
            <p className="text-gray-700">Create an account with social login. No crypto wallet setup needed - we handle everything for you.</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">2. Choose NFT & Charity</h3>
            <p className="text-gray-700">Browse our collection of exclusive NFTs and select which charity you want to support.</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💝</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">3. Purchase & Support</h3>
            <p className="text-gray-700">Complete your purchase with traditional payment methods. 100% of proceeds go to your chosen charity.</p>
          </div>
        </div>
      </div>
    </section>
  );
}