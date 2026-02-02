'use client';

import { useState, useEffect, useRef } from 'react';
import { translations, Language } from '@/lib/i18n';

interface CapCutTimelineProps {
  lang?: Language;
}

// Ken Burns 효과 패턴 (줌인/줌아웃 + 방향)
const kenBurnsPatterns = [
  'kenburns-zoom-in-left',
  'kenburns-zoom-out-right',
  'kenburns-zoom-in-center',
  'kenburns-zoom-out-left',
  'kenburns-zoom-in-right',
  'kenburns-zoom-out-center',
  'kenburns-zoom-in-top',
  'kenburns-zoom-out-bottom',
];

const scenes = [
  { id: 1, duration: 4, color: '#6366f1', label: 'Scene 1', image: '/images/samples/scene_1.jpg' },
  { id: 2, duration: 3, color: '#8b5cf6', label: 'Scene 2', image: '/images/samples/scene_2.jpg' },
  { id: 3, duration: 4, color: '#a855f7', label: 'Scene 3', image: '/images/samples/scene_3.jpg' },
  { id: 4, duration: 3, color: '#d946ef', label: 'Scene 4', image: '/images/samples/scene_4.jpg' },
  { id: 5, duration: 4, color: '#ec4899', label: 'Scene 5', image: '/images/samples/scene_5.jpg' },
  { id: 6, duration: 3, color: '#f43f5e', label: 'Scene 6', image: '/images/samples/scene_6.jpg' },
  { id: 7, duration: 4, color: '#fb7185', label: 'Scene 7', image: '/images/samples/scene_7.jpg' },
  { id: 8, duration: 3, color: '#fda4af', label: 'Scene 8', image: '/images/samples/scene_8.jpg' },
];

export default function CapCutTimeline({ lang = 'ko' }: CapCutTimelineProps) {
  const t = translations[lang];

  const subtitles = [
    { id: 1, start: 0, duration: 4, text: t.timeline_sub1 },
    { id: 2, start: 4, duration: 3, text: t.timeline_sub2 },
    { id: 3, start: 7, duration: 4, text: t.timeline_sub3 },
    { id: 4, start: 11, duration: 3, text: t.timeline_sub4 },
    { id: 5, start: 14, duration: 4, text: t.timeline_sub5 },
    { id: 6, start: 18, duration: 3, text: t.timeline_sub6 },
    { id: 7, start: 21, duration: 4, text: t.timeline_sub7 },
    { id: 8, start: 25, duration: 3, text: t.timeline_sub8 },
  ];
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted to avoid disturbing users
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

  // Audio control
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to interact first
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  // Reset audio when playhead resets
  useEffect(() => {
    if (audioRef.current && playheadPosition === 0) {
      audioRef.current.currentTime = 0;
    }
  }, [playheadPosition]);

  // Animate playhead
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setPlayheadPosition(p => {
        if (p >= totalDuration) return 0;
        return p + 0.1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying, totalDuration]);

  // Calculate current scene
  const getCurrentScene = () => {
    let accumulated = 0;
    for (const scene of scenes) {
      accumulated += scene.duration;
      if (playheadPosition < accumulated) {
        return scene.id;
      }
    }
    return scenes[scenes.length - 1].id;
  };

  const currentScene = getCurrentScene();

  return (
    <div className="space-y-4">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/audio/classical-baroque.mp3"
        loop
        preload="auto"
      />

      {/* CapCut-style UI */}
      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span>CapCut</span>
            <span className="text-gray-600">|</span>
            <span className="text-violet-400">Whisk2CapCut Project</span>
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Preview Area */}
        <div className="flex">
          {/* Preview */}
          <div className="flex-1 p-4">
            <div className="aspect-video bg-gray-950 rounded-lg overflow-hidden relative">
              {/* Scene image preview with Ken Burns effect */}
              {scenes.map((scene, index) => (
                <div
                  key={scene.id}
                  className={`absolute inset-0 transition-opacity duration-500 overflow-hidden ${
                    currentScene === scene.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={scene.image}
                    alt={scene.label}
                    className={`w-full h-full object-cover ${
                      currentScene === scene.id ? kenBurnsPatterns[index % kenBurnsPatterns.length] : ''
                    }`}
                    style={{
                      animationDuration: `${scene.duration}s`,
                      animationTimingFunction: 'ease-out',
                    }}
                  />
                </div>
              ))}

              {/* Subtitle overlay */}
              <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                <div className="px-4 py-2 bg-black/70 rounded-lg">
                  <span className="text-white text-sm font-medium">
                    {subtitles[currentScene - 1]?.text}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right panel - Properties */}
          <div className="w-48 border-l border-gray-700 p-3 text-xs">
            {/* Playback time - moved here */}
            <div className="text-center mb-4 pb-4 border-b border-gray-700">
              <div className="text-gray-400 mb-1">{t.timeline_playback}</div>
              <div className="text-xl font-mono text-white font-bold">
                {formatTime(playheadPosition)}
              </div>
              <div className="text-gray-500 text-xs">/ {formatTime(totalDuration)}</div>
              <div className="mt-2 px-2 py-1 bg-violet-600/30 rounded text-violet-300">
                Scene {currentScene} / {scenes.length}
              </div>
            </div>

            <div className="text-gray-400 mb-2">{t.timeline_properties}</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">{t.timeline_resolution}</span>
                <span className="text-white">1920×1080</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t.timeline_framerate}</span>
                <span className="text-white">30fps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t.timeline_clips}</span>
                <span className="text-white">{scenes.length}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-violet-400 mb-2">Ken Burns</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-green-400">{t.timeline_applied}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Area */}
        <div className="border-t border-gray-700 flex">
          {/* Tracks */}
          <div className="flex-1 px-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 w-16">🎬 Video</span>
              <div className="flex-1 relative h-12 bg-gray-800 rounded overflow-hidden">
                {/* Scene clips with thumbnails */}
                <div className="absolute inset-0 flex">
                  {scenes.map((scene, i) => {
                    const widthPercent = scene.duration / totalDuration * 100;
                    return (
                      <div
                        key={scene.id}
                        className="h-full relative overflow-hidden border-r border-gray-700"
                        style={{
                          width: `${widthPercent}%`,
                        }}
                      >
                        {/* Thumbnail image */}
                        <img
                          src={scene.image}
                          alt={scene.label}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay with scene label */}
                        <div
                          className="absolute inset-0 flex items-end justify-center pb-1"
                          style={{ background: `linear-gradient(to top, ${scene.color}cc, transparent)` }}
                        >
                          <span className="text-xs font-medium text-white drop-shadow-md truncate px-1">
                            {scene.id}
                          </span>
                        </div>
                        {/* Active indicator */}
                        {currentScene === scene.id && (
                          <div className="absolute inset-0 border-2 border-white/50" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 transition-all"
                  style={{ left: `${(playheadPosition / totalDuration) * 100}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rotate-45" />
                </div>
              </div>
            </div>

            {/* Audio Track */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 w-16">🎵 Audio</span>
              <div className="flex-1 relative h-6 bg-gray-800 rounded overflow-hidden">
                <div
                  className="absolute inset-0 flex items-center"
                  style={{
                    background: 'linear-gradient(90deg, #22c55e20, #22c55e40, #22c55e20)',
                  }}
                >
                  {/* Audio waveform visualization */}
                  <div className="flex items-center justify-around w-full h-full px-2">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-green-500/60 rounded-full"
                        style={{
                          width: '2px',
                          height: `${Math.random() * 60 + 20}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 transition-all"
                  style={{ left: `${(playheadPosition / totalDuration) * 100}%` }}
                />
              </div>
            </div>

            {/* Subtitle Track */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-16">💬 Subtitle</span>
              <div className="flex-1 relative h-8 bg-gray-800 rounded overflow-hidden">
                {/* Subtitle clips */}
                <div className="absolute inset-0 flex">
                  {subtitles.map((sub) => {
                    const leftPercent = sub.start / totalDuration * 100;
                    const widthPercent = sub.duration / totalDuration * 100;
                    return (
                      <div
                        key={sub.id}
                        className="h-full flex items-center justify-center text-xs text-white bg-yellow-600/80 border-r border-yellow-700"
                        style={{ width: `${widthPercent}%` }}
                      >
                        <span className="truncate px-1 text-xs">{sub.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 transition-all"
                  style={{ left: `${(playheadPosition / totalDuration) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 py-3 border-t border-gray-700">
            <button
              onClick={() => setPlayheadPosition(0)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ⏮️
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-violet-600 hover:bg-violet-700 rounded-full text-white transition-colors"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button
              onClick={() => setPlayheadPosition(totalDuration)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ⏭️
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 transition-colors ${isMuted ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
      </div>

      {/* Description */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t.timeline_desc}
        </p>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
