/**
 * Gift bundle configuration.
 *
 * Each gift has its own landing page at /gift/{slug}/ (slug is the URL keyword
 * revealed in the tutorial video, not literally the gift name — light puzzle).
 *
 * Each gift has its own CASE-SENSITIVE password that must match the zip extraction password.
 * Different tutorial videos can reveal different passwords for different gifts.
 */

export type Gift = {
  slug: string;          // URL keyword: effect / look / help / music / kit / start
  icon: string;          // emoji
  name: string;          // display name
  unit: string;          // e.g. "222 sounds"
  description: string;   // 1-line value prop
  longDesc: string;      // longer paragraph
  downloadUrl: string;   // GitHub Releases URL (placeholder until upload)
  filename: string;      // suggested filename when downloaded
  size: string;          // "2.3 MB"
  accent: string;        // hex color
  password: string;      // per-gift CASE-SENSITIVE password (matches zip extraction password)
};

export const GIFTS: Record<string, Gift> = {
  effect: {
    slug: 'effect',
    icon: '🎵',
    name: 'AutoFlowCut SFX Pack v1',
    unit: '222 sounds',
    description: 'Click-ready sound effects · CC0 · commercial-OK',
    longDesc:
      '222 curated CC0 sound effects in 15 categories: UI clicks, impacts, transitions, retro game SFX, voiceovers, and more. All MP3 192k VBR. From Kenney.nl, OpenGameArt CC0 contributors, and Juhani Junkala. Free to use in any project — no attribution required.',
    downloadUrl:
      'https://github.com/touchizen/touchizen.github.io/releases/download/gifts-v1/AutoFlowCut_SFX_Pack_v1.zip',
    filename: 'AutoFlowCut_SFX_Pack_v1.zip',
    size: '2.3 MB',
    accent: '#51CF66',
    password: 'AutoFlowCut',
  },
  look: {
    slug: 'look',
    icon: '🎨',
    name: 'AutoFlowCut Style Pack v1',
    unit: '108 prompts',
    description: 'Cinematic AI image style presets · drag-and-drop',
    longDesc:
      '108 hand-curated AI image generation style prompts in 11 categories: animation, photography, film cinematography, Asian traditional, Western art (public-domain), illustration, digital art, sci-fi/fantasy, game/3D, effects, misc. JSON + CSV format. Includes hardened merge script for AutoFlowCut.',
    downloadUrl:
      'https://github.com/touchizen/touchizen.github.io/releases/download/gifts-v1/AutoFlowCut_Style_Pack_v1.zip',
    filename: 'AutoFlowCut_Style_Pack_v1.zip',
    size: '27 KB',
    accent: '#4ECDC4',
    password: 'AutoFlowCut',
  },
  help: {
    slug: 'help',
    icon: '📖',
    name: 'Faceless YouTube Guide v1',
    unit: '111-page PDF',
    description: 'Complete playbook · launch your channel in 30 days',
    longDesc:
      '111-page strategy book covering niche selection, the YouTube algorithm, scripting (with 7 hook archetypes, 3-act, Freytag 5-act, and 기승전결 frameworks), AI tool stack, voice/audio production, visuals, editing, thumbnails, SEO, monetization, legal/AI disclosure, 10 channel case studies, a 30-day launch plan, and a curated 120-tool directory.',
    downloadUrl:
      'https://github.com/touchizen/touchizen.github.io/releases/download/gifts-v1/Faceless_YouTube_Guide_v1.zip',
    filename: 'Faceless_YouTube_Guide_v1.zip',
    size: '173 KB',
    accent: '#FFA94D',
    password: 'AutoFlowCut',
  },
  music: {
    slug: 'music',
    icon: '🎬',
    name: 'AutoFlowCut BGM Pack v1',
    unit: '88 tracks',
    description: 'Intense + emotional mood library · CC0 / Public Domain',
    longDesc:
      '88 background music tracks (30 curated picks + 58 bonus) in 10 mood folders: trailer-epic, action-driving, cinematic-tense, battle-heroic, dark-dramatic, trailer-percussion, sports-motivation, synthwave-aggressive, rock-energy, and emotional-cinematic. All MP3 192k @ -16 LUFS. 100% safe for commercial use — from OpenGameArt CC0 and Internet Archive Public Domain.',
    downloadUrl:
      'https://github.com/touchizen/touchizen.github.io/releases/download/gifts-v1/AutoFlowCut_BGM_Pack_v1.zip',
    filename: 'AutoFlowCut_BGM_Pack_v1.zip',
    size: '298 MB',
    accent: '#FF6B6B',
    password: 'AutoFlowCut',
  },
  kit: {
    slug: 'kit',
    icon: '🛠',
    name: 'AutoFlowCut Creator Templates v1',
    unit: '9 files',
    description: 'Hook patterns + checklists + working examples · ship faster',
    longDesc:
      '9 actionable files extracted from the Faceless YouTube Guide and the tutorial production: 7 Hook Archetypes (markdown), 3-Act / Freytag / 기승전결 script template (markdown), AutoFlowCut-compatible storyboard CSV, printable 30-day Channel Launch Checklist (PDF), pre-publish QA checklist (PDF), and 4 real Story Engine example prompts (Dyatlov Pass, Mary Celeste, Blacksmith\'s Three Wives, GameStop short squeeze) covering both dark-history and bespoke genres. Copy, fill in, ship.',
    downloadUrl:
      'https://github.com/touchizen/touchizen.github.io/releases/download/gifts-v1/AutoFlowCut_Creator_Templates_v1.zip',
    filename: 'AutoFlowCut_Creator_Templates_v1.zip',
    size: '24 KB',
    accent: '#9775FA',
    password: 'AutoFlowCut',
  },
  start: {
    slug: 'start',
    icon: '🌱',
    name: 'AutoFlowCut Shortform Starter v1',
    unit: 'starter kit',
    description: '30-second economic shortform · meta prompts + samples + ebook',
    longDesc:
      'Complete beginner starter kit for AI-driven economic shortform creation. Includes: 2 meta prompts (script generation + scene prompts), sample 8-scene SRT with U.S. Treasury fiscal data (May 2026), Typecast-rendered audio package (combined MP3 + 8 line-MP3s), image prompt template, automation script (generate_tts.py), and a beginner ebook covering the 5-stage workflow from script to CapCut export. Released alongside the ep02 tutorial of the AutoFlowCut series.',
    downloadUrl:
      'https://github.com/touchizen/touchizen.github.io/releases/download/gifts-v1/AutoFlowCut_Shortform_Starter_v1.zip',
    filename: 'AutoFlowCut_Shortform_Starter_v1.zip',
    size: '2.2 MB',
    accent: '#339AF0',
    password: 'AutoFlowCut-DEBT',
  },
};

/** Strip whitespace/separators only; preserves case for parity with zip behavior. */
export function normalizePassword(input: string): string {
  return input.replace(/[\s\-_]/g, '');
}

/**
 * Check whether an input matches the gift's password. CASE-SENSITIVE.
 * Whitespace, hyphens, and underscores are normalized away on BOTH sides
 * so users typing "AutoFlowCut DEBT" or "AutoFlowCutDEBT" can match
 * "AutoFlowCut-DEBT". For actual zip extraction, the exact stored password is required.
 */
export function checkPassword(input: string, expected: string): boolean {
  return normalizePassword(input) === normalizePassword(expected);
}
