import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-6xl font-bold mb-4 text-black dark:text-white">
          Spend Sense
        </h1>
        <p className="text-2xl mb-6 text-gray-700 dark:text-gray-300">
          See where your money goes
        </p>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
          Track expenses scattered across cash, cards, and subscriptions. Get monthly breakdowns by category and understand your spending patterns at a glance.
        </p>
        <Link href="/auth">
          <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-80 transition">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
