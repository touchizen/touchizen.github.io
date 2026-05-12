'use client';

import { useEffect, useState } from 'react';
import { Gift, checkPassword } from '@/lib/gifts';

type Props = { gift: Gift };

/**
 * Shared landing page for each gift.
 * Shows gift preview + locked download button. Password input unlocks the link.
 */
export default function GiftPage({ gift }: Props) {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  // Persist unlock state per gift slug so users don't have to re-enter
  // when switching between gift pages.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.localStorage.getItem('autoflowcut_gift_unlocked') === 'yes') {
        setUnlocked(true);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(input)) {
      setUnlocked(true);
      try {
        window.localStorage.setItem('autoflowcut_gift_unlocked', 'yes');
      } catch {}
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a14] text-white antialiased">
      {/* Yellow top accent bar */}
      <div className="h-1.5 w-full bg-[#E4FA04]" />

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Brand header */}
        <div className="mb-12 flex items-center justify-between">
          <a
            href="https://touchizen.com"
            className="text-sm font-bold tracking-widest text-[#E4FA04] hover:text-white transition"
          >
            ← TOUCHIZEN
          </a>
          <div className="text-xs font-bold tracking-wider text-zinc-500">
            FREE GIFT · v1
          </div>
        </div>

        {/* Gift preview card */}
        <div
          className="rounded-3xl border-2 p-10 mb-8"
          style={{
            borderColor: gift.accent,
            background:
              'linear-gradient(180deg, #14141f 0%, #1a1a28 100%)',
            boxShadow: `0 0 80px ${gift.accent}33`,
          }}
        >
          {/* Icon + name */}
          <div className="flex items-center gap-6 mb-6">
            <div className="text-7xl drop-shadow-[0_0_20px_rgba(228,250,4,0.4)]">
              {gift.icon}
            </div>
            <div className="flex-1">
              <div
                className="text-xs font-bold tracking-[0.3em] mb-2"
                style={{ color: gift.accent }}
              >
                GIFT FOR YOU
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                {gift.name}
              </h1>
            </div>
          </div>

          {/* Unit + size badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span
              className="rounded-full px-4 py-1.5 text-sm font-bold tracking-wider"
              style={{
                background: `${gift.accent}22`,
                color: gift.accent,
                border: `1px solid ${gift.accent}66`,
              }}
            >
              {gift.unit}
            </span>
            <span className="rounded-full bg-zinc-800 px-4 py-1.5 text-sm font-bold tracking-wider text-zinc-400">
              {gift.size}
            </span>
            <span className="rounded-full bg-zinc-800 px-4 py-1.5 text-sm font-bold tracking-wider text-zinc-400">
              CC0 / Public Domain · Commercial OK
            </span>
          </div>

          {/* Short description */}
          <p className="text-xl text-zinc-200 mb-5 font-medium">
            {gift.description}
          </p>

          {/* Long description */}
          <p className="text-sm text-zinc-400 leading-relaxed">
            {gift.longDesc}
          </p>
        </div>

        {/* Password gate / Download */}
        {!unlocked ? (
          <div
            className={`rounded-2xl bg-[#14141f] border border-zinc-800 p-8 ${
              shake ? 'animate-shake' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔒</span>
              <div className="text-xs font-bold tracking-[0.25em] text-zinc-500">
                LOCKED · TUTORIAL VIEWERS ONLY
              </div>
            </div>
            <h2 className="text-2xl font-black mb-1">
              Enter the password
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Revealed at the end of the AutoFlowCut tutorial video. Case-sensitive.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="password"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 rounded-xl bg-zinc-900 border border-zinc-700 px-5 py-4 text-lg font-mono tracking-wider text-white outline-none focus:border-[#E4FA04] focus:ring-1 focus:ring-[#E4FA04]/40"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#E4FA04] px-8 py-4 text-lg font-black tracking-wider text-black hover:bg-yellow-300 transition shadow-[0_0_30px_rgba(228,250,4,0.4)]"
              >
                UNLOCK
              </button>
            </form>

            {shake && (
              <p className="mt-4 text-sm text-red-400 font-medium">
                Not quite — watch the video to the end for the password.
              </p>
            )}
          </div>
        ) : (
          <div
            className="rounded-2xl border-2 p-8"
            style={{
              borderColor: gift.accent,
              background: `linear-gradient(135deg, ${gift.accent}11 0%, transparent 100%)`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔓</span>
              <div
                className="text-xs font-bold tracking-[0.25em]"
                style={{ color: gift.accent }}
              >
                UNLOCKED · ENJOY
              </div>
            </div>
            <h2 className="text-2xl font-black mb-2">
              Your gift is ready
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              The download is also password-protected. Use the same password to extract the zip.
            </p>

            <a
              href={gift.downloadUrl}
              download={gift.filename}
              className="inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-black tracking-wider text-black hover:opacity-90 transition shadow-[0_0_30px_rgba(228,250,4,0.4)]"
              style={{ background: gift.accent }}
            >
              <span>⬇</span>
              <span>DOWNLOAD {gift.filename}</span>
              <span className="text-sm font-bold opacity-70">· {gift.size}</span>
            </a>

            {/* Zip password hint — no actual password shown */}
            <div className="mt-6 rounded-xl bg-zinc-900 border border-zinc-800 p-5">
              <div className="text-xs font-bold tracking-[0.2em] text-zinc-500 mb-2">
                🔐 ZIP IS ALSO PASSWORD-PROTECTED
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                When you double-click the downloaded <code className="text-[#E4FA04] font-mono">.zip</code>, your OS
                will ask for a password. <strong className="text-white">Use the same password you just entered</strong> —
                it&apos;s exactly as shown in the video.
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Case-sensitive. The password is never displayed on this site — only in the video.
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-center text-xs text-zinc-500">
              🎁 More gifts are hidden in the video. Keep watching to find them.
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-zinc-600">
          <p className="mb-2">
            All gifts are free for tutorial viewers. Released as CC0 or Public Domain
            where applicable.
          </p>
          <a
            href="https://github.com/touchizen/AutoFlowCut"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-[#E4FA04] transition"
          >
            github.com/touchizen/AutoFlowCut
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </main>
  );
}
