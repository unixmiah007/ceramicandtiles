import { StockImage, galleryImages, getServiceImage } from './images';
import { services } from './services';

export interface TileSample {
  id: string;
  image: StockImage;
  category: 'bathroom' | 'kitchen' | 'shower' | 'floor' | 'commercial' | 'accent';
}

export const tileSamples: TileSample[] = [
  {
    id: 'spa-bathroom',
    image: galleryImages[0],
    category: 'bathroom',
  },
  {
    id: 'kitchen-backsplash',
    image: galleryImages[1],
    category: 'kitchen',
  },
  {
    id: 'geometric-shower',
    image: galleryImages[2],
    category: 'shower',
  },
  {
    id: 'large-format-floor',
    image: galleryImages[3],
    category: 'floor',
  },
  {
    id: 'marble-shower',
    image: galleryImages[4],
    category: 'shower',
  },
  {
    id: 'mosaic-accent',
    image: galleryImages[5],
    category: 'accent',
  },
  {
    id: 'ceramic-porcelain',
    image: getServiceImage('ceramic-porcelain', 'Ceramic & Porcelain Tile'),
    category: 'floor',
  },
  {
    id: 'custom-design',
    image: getServiceImage('custom-designs', 'Custom Tile Designs'),
    category: 'accent',
  },
];

export const propertyTypes = ['residential', 'commercial'] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const timelineOptions = [
  'asap',
  'one-to-three-months',
  'three-to-six-months',
  'planning-ahead',
  'not-sure',
] as const;

export type TimelineOption = (typeof timelineOptions)[number];

export const projectSizeOptions = [
  'small',
  'medium',
  'large',
  'full-renovation',
  'not-sure',
] as const;

export type ProjectSizeOption = (typeof projectSizeOptions)[number];

export interface WizardFormData {
  propertyType: PropertyType | '';
  propertyDescription: string;
  location: string;
  serviceId: string;
  tileSampleIds: string[];
  projectSize: ProjectSizeOption | '';
  timeline: TimelineOption | '';
  additionalNotes: string;
  name: string;
  email: string;
  phone: string;
}

export const initialWizardForm: WizardFormData = {
  propertyType: '',
  propertyDescription: '',
  location: '',
  serviceId: '',
  tileSampleIds: [],
  projectSize: '',
  timeline: '',
  additionalNotes: '',
  name: '',
  email: '',
  phone: '',
};

export const wizardSteps = [
  'property',
  'service',
  'tiles',
  'details',
  'contact',
] as const;

export type WizardStep = (typeof wizardSteps)[number];

export function getTileSampleById(id: string): TileSample | undefined {
  return tileSamples.find((sample) => sample.id === id);
}

export function getServiceTitleById(serviceId: string): string {
  return services.find((service) => service.id === serviceId)?.title ?? serviceId;
}
