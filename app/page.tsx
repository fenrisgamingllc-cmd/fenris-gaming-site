import HomePage from '@/components/HomePage';

// Regenerate the prerendered "This week" dates at least daily. The client
// still advances the clock after hydration, so a visitor isn't stuck on the
// previous day's HTML until the next revalidation.
export const revalidate = 86400;

export default function Page() {
  const simulated = process.env['SIMULATE_NOW'];
  const initialNow = simulated || new Date().toISOString();
  return <HomePage initialNow={initialNow} />;
}
