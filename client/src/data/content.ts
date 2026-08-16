import { Project, ContactInfo } from '../types';

export { services, getServiceById } from './services';

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

export { valuePropositions, getValueById } from './values';

export const contactInfo: ContactInfo = {
  name: 'Abel Portillo',
  phone: '703-867-0742',
  email: 'PortilloCeramicTile@gmail.com',
};

