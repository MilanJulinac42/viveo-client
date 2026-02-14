"use client";

interface MiniPhoneMockupProps {
  name: string;
  category: string;
  accentClass?: string;
  delay?: number;
}

export default function MiniPhoneMockup({ name, category, accentClass = "from-primary-500 to-primary-700", delay = 0 }: MiniPhoneMockupProps) {
  return (
    <div
      className="relative w-[120px] sm:w-[140px]"
      style={{ animation: `hero-float 5s ease-in-out ${delay}s infinite` }}
    >
      {/* Subtle glow */}
      <div className="absolute -inset-3 rounded-full bg-primary-300/10 blur-2xl" />

      {/* Phone frame */}
      <div className="relative rounded-[1.5rem] border-2 border-slate-200 bg-white p-1.5 shadow-lg">
        {/* Screen */}
        <div className={`relative overflow-hidden rounded-[1.2rem] bg-gradient-to-br ${accentClass}`}>
          <div className="relative aspect-[9/16]">
            {/* Avatar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full border-2 border-white/30 bg-white/20">
                <svg viewBox="0 0 100 100" className="h-full w-full text-white/50">
                  <circle cx="50" cy="35" r="18" fill="currentColor" />
                  <ellipse cx="50" cy="80" rx="28" ry="22" fill="currentColor" />
                </svg>
              </div>
              <p className="mt-2 text-[10px] font-bold text-white">{name}</p>
              <p className="text-[8px] text-white/60">{category}</p>

              {/* Play button */}
              <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="ml-0.5 h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Top label */}
            <div className="absolute top-2 left-0 right-0 text-center">
              <span className="text-[7px] font-medium text-white/50">Viveo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
