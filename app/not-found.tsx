import Link from 'next/link';
import { Sword } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6">
        <Sword className="w-8 h-8 text-[#0a0f1a]" />
      </div>
      <h1 className="text-6xl font-bold tracking-tighter">404</h1>
      <p className="text-xl mt-2 text-[#9ca3af]">This table doesn’t exist (yet).</p>
      <p className="text-sm text-[#6b7280] mt-1">The dice have spoken… or you followed a broken link.</p>

      <Link href="/" className="mt-8 inline-flex items-center gap-2 px-6 h-11 rounded-full bg-[#c5a46e] text-[#0a0f1a] font-semibold hover:bg-[#d4b47e] active:scale-[0.985]">
        Return to the Hall
      </Link>
    </div>
  );
}
