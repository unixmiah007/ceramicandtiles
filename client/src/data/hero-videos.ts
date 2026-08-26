/** Professional shower tile installation timelapse — waterproofing through ceramic tile work. */
export const SERVICE_AREA_HERO_VIDEO = {
  youtubeId: '7Gi5W9L5Wxo',
  title: 'Professional interior tile and shower installation timelapse',
} as const;

export function buildHeroVideoEmbedUrl(youtubeId: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    loop: '1',
    playlist: youtubeId,
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    disablekb: '1',
    fs: '0',
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}
