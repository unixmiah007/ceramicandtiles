import { Service, Project, ValueProposition, ContactInfo } from '../types';

export const services: Service[] = [
  {
    id: 'bathroom-renovations',
    title: 'Bathroom Renovations',
    description: 'Complete bathroom transformations from demolition through finishing touches.',
  },
  {
    id: 'shower-installation',
    title: 'Shower Installation & Renovation',
    description: 'Custom shower builds and renovations with proper waterproofing and precision tile work.',
  },
  {
    id: 'ceramic-porcelain',
    title: 'Ceramic & Porcelain Tile',
    description: 'Expert installation of ceramic and porcelain tile for floors, walls, and specialty areas.',
  },
  {
    id: 'shower-waterproofing',
    title: 'Shower Waterproofing',
    description: 'Proper waterproofing systems to protect your investment and prevent moisture damage.',
  },
  {
    id: 'floor-wall-tile',
    title: 'Floor & Wall Tile',
    description: 'Professional floor and wall tile installation with clean cuts and consistent grout lines.',
  },
  {
    id: 'commercial-tile',
    title: 'Commercial Tile Installation',
    description: 'Durable tile solutions for commercial facilities built to withstand high-traffic use.',
  },
  {
    id: 'locker-rooms',
    title: 'Locker Rooms',
    description: 'Tile and ceramic work for locker rooms and professional facility spaces.',
  },
  {
    id: 'backsplashes',
    title: 'Backsplashes',
    description: 'Custom backsplash designs that add beauty and function to kitchens and bathrooms.',
  },
  {
    id: 'tile-replacement',
    title: 'Tile Replacement',
    description: 'Remove outdated tile and install fresh, modern surfaces that transform your space.',
  },
  {
    id: 'tile-repair',
    title: 'Tile Repair',
    description: 'Targeted repairs to restore damaged or failing tile without a full renovation.',
  },
  {
    id: 'demolition-removal',
    title: 'Demolition & Removal',
    description: 'Careful demolition and removal to prepare your space for new tile installation.',
  },
  {
    id: 'custom-designs',
    title: 'Custom Tile Designs',
    description: 'Unique layouts and patterns tailored to your vision and space.',
  },
];

export const projects: Project[] = [
  {
    id: 'washington-capitals',
    name: 'Washington Capitals – Capital One Arena',
    location: 'Washington, D.C.',
    description:
      'Tile and ceramic work completed in professional locker room and restroom facilities at Capital One Arena, home of the Washington Capitals.',
  },
  {
    id: 'the-pentagon',
    name: 'The Pentagon',
    location: 'Washington, D.C.',
    description:
      'Tile and ceramic work completed in restroom facilities and professional spaces.',
  },
  {
    id: 'orangetheory-fitness',
    name: 'Orangetheory Fitness',
    location: 'Leesburg, Virginia',
    description:
      'Tile work completed in locker rooms and facility spaces designed for everyday, high-traffic use.',
  },
];

export const valuePropositions: ValueProposition[] = [
  {
    id: 'family-owned',
    title: 'Family-Owned',
    description:
      'Our name is on every project. We treat every customer and every home with respect.',
  },
  {
    id: 'professional-experience',
    title: 'Professional Experience',
    description:
      'Our work spans residential projects and professional commercial facilities.',
  },
  {
    id: 'attention-to-detail',
    title: 'Attention to Detail',
    description:
      'Clean cuts, precise layouts, consistent grout lines, and quality finishing are what separate good work from great work.',
  },
  {
    id: 'quality-without-shortcuts',
    title: 'Quality Without Shortcuts',
    description:
      'We believe in doing things correctly—not simply getting the job finished quickly.',
  },
  {
    id: 'built-to-last',
    title: 'Built to Last',
    description:
      'We focus on proper preparation and installation so your investment can stand up to everyday use.',
  },
];

export const contactInfo: ContactInfo = {
  name: 'Abel Portillo',
  phone: '703-867-0742',
  email: 'PortilloCeramicTile@gmail.com',
};

export const projectTypes = [
  'Bathroom Renovation',
  'Shower Installation',
  'Tile Replacement',
  'Commercial Project',
  'Tile Repair',
  'Other',
];
