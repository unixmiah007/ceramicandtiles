export type SocialProfileId = 'facebook' | 'instagram' | 'youtube';

export interface SocialProfile {
  id: SocialProfileId;
  href: string;
  label: string;
}

export const socialProfiles: SocialProfile[] = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/portilloceramicandtile',
    label: 'Instagram',
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/',
    label: 'Facebook',
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/',
    label: 'YouTube',
  },
];
