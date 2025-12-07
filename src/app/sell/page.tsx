// src/app/sell/page.tsx
import SellCarForm from "@/components/SellCar/SellCarForm";

export const metadata = {
  title: "Sell Your Car — CARS ABEG",
  description: "List your car quickly on CARS ABEG. Free for 30 days.",
};

export default function SellCarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 py-12 sm:py-16 md:py-20 text-white px-4 sm:px-6 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">
            SELL YOUR CAR{" "}
            <span className="text-yellow-400 block sm:inline">TODAY</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg px-2">
            Fast, trusted listings — free for the first 30 days.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 md:py-20 -mt-6 sm:-mt-10 relative z-10">
        <SellCarForm />
      </div>
    </div>
  );
}
