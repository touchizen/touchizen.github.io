/**
 * Gift bundle configuration.
 *
 * Each gift has its own landing page at /gift/{slug}/ (slug is the URL keyword
 * revealed in the tutorial video, not literally the gift name — light puzzle).
 *
 * Single shared password (`AutoFlowCut`) unlocks the download on every page.
 * The password is CASE-SENSITIVE and must match the zip extraction password.
 */

export type Gift = {
  slug: string;          // URL keyword: effect / look / help / music / kit
  icon: string;          // emoji
  name: string;          // display name
  unit: string;          // e.g. "222 sounds"
  description: string;   // 1-line value prop
  longDesc: string;      // longer paragraph
  downloadUrl: string;   // GitHub Releases URL (placeholder until upload)
  filename: string;      // suggested filename when downloaded
  size: string;          // "2.3 MB"
  accent: string;        // hex color
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
  },
  kit: {
    slug: 'kit',
    icon: '🛠',
    name: 'AutoFlowCut Creator Templates v1',
    unit: '5 files',
    description: 'Hook patterns + checklists · ship faster',
    longDesc:
      '5 actionable files extracted from the Faceless YouTube Guide: 7 Hook Archetypes (markdown), 3-Act / Freytag / 기승전결 script template (markdown), AutoFlowCut-compatible storyboard CSV, printable 30-day Channel Launch Checklist (PDF), and a pre-publish QA checklist (PDF). Copy, fill in, ship.',
    downloadUrl:
      'https://github.com/touchizen/touchizen.github.io/releases/download/gifts-v1/AutoFlowCut_Creator_Templates_v1.zip',
    filename: 'AutoFlowCut_Creator_Templates_v1.zip',
    size: '17 KB',
    accent: '#9775FA',
  },
};

/**
 * Single shared password — CASE-SENSITIVE.
 * Must match exactly to also work as the zip extraction password.
 */
export const PASSWORD = 'AutoFlowCut';

/** Strip whitespace/separators only; preserves case for parity with zip behavior. */
export function normalizePassword(input: string): string {
  return input.replace(/[\s\-_]/g, '');
}

/** Check whether an input matches the gift password. Case-sensitive. */
export function checkPassword(input: string): boolean {
  return normalizePassword(input) === PASSWORD;
}
