export default function Card() {
  return (
    <div >
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm w-full border border-highlight">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-stone-100">
          <img
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=600&fit=crop"
            alt="Organic Herbal Tea"
            className="w-full h-72 object-cover rounded-t-3xl hover:scale-105 transition-transform duration-500"
          />
          {/* Discount Badge */}
          <div className="absolute top-4 right-4 bg-highlight text-white font-bold px-4 py-2 rounded-full shadow-lg">
            29% OFF
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          {/* Product Name */}
          <h2 className="text-2xl font-bold text-stone-800 text-center">
            Organic Herbal Tea Collection
          </h2>

          {/* Pricing */}
          <div className="flex items-center justify-center gap-3 py-4">
            <span className="text-stone-400 line-through text-lg font-medium">
              $34.99
            </span>
            <span className="text-highlight text-3xl font-bold">
              $24.99
            </span>
          </div>

          {/* Buy Button */}
          <button className="w-full bg-highlight hover:bg-highlight/90 text-white font-semibold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 active:shadow-sm cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}