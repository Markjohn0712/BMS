export type FileCategoryKey =
  | 'condition'
  | 'inventory'
  | 'load-posting'
  | 'mandatory-site-visit'
  | 'plans'
  | 'sketch';

export type FileCategory = {
  key: FileCategoryKey;
  title: string;
  description: string;
  count: number;
  unit: 'Photos' | 'Files';
  status: 'complete' | 'missing';
  missingCount?: number;
  filePrefix: string;
  extension: 'jpg' | 'pdf';
  captions: string[];
};

export const BRIDGE = {
  id: 'B00007SM',
  name: 'Acerida Br.',
  fullName: 'Acerida Bridge',
  surveyDate: 'Aug 15, 2026',
  inspectionYear: '2026',
  region: 'Region I',
  province: 'Northern Samar',
} as const;

export const FILE_CATEGORIES: FileCategory[] = [
  {
    key: 'condition',
    title: 'Condition',
    description: 'Defects & Condition Assessment',
    count: 24,
    unit: 'Photos',
    status: 'complete',
    filePrefix: 'COND',
    extension: 'jpg',
    captions: [
      'General deck view',
      'Bearing area',
      'Expansion joint',
      'Railing condition',
      'Underside - Span 1',
      'Approach slab',
      'Wingwall condition',
      'Pier cap',
    ],
  },
  {
    key: 'inventory',
    title: 'Inventory',
    description: 'General Bridge Views',
    count: 18,
    unit: 'Photos',
    status: 'complete',
    filePrefix: 'INV',
    extension: 'jpg',
    captions: [
      'Upstream elevation',
      'Downstream elevation',
      'Approach view',
      'Overall span view',
      'Bridge nameplate',
      'Roadway surface',
    ],
  },
  {
    key: 'load-posting',
    title: 'Load Posting',
    description: 'Load Limit Signs',
    count: 6,
    unit: 'Photos',
    status: 'missing',
    missingCount: 2,
    filePrefix: 'LOAD',
    extension: 'jpg',
    captions: ['Load limit sign - approach', 'Weight restriction signage', 'Clearance sign'],
  },
  {
    key: 'mandatory-site-visit',
    title: 'Mandatory and Site Visit',
    description: 'Required Inspection Photos',
    count: 12,
    unit: 'Photos',
    status: 'complete',
    filePrefix: 'MSV',
    extension: 'jpg',
    captions: ['Inspector at site', 'Site access point', 'Survey equipment setup', 'Team photo - site visit'],
  },
  {
    key: 'plans',
    title: 'Plans',
    description: 'Bridge Plans & Blueprints',
    count: 4,
    unit: 'Files',
    status: 'complete',
    filePrefix: 'PLAN',
    extension: 'pdf',
    captions: ['As-built plan', 'Structural drawing', 'Site layout plan'],
  },
  {
    key: 'sketch',
    title: 'Sketch',
    description: 'Bridge Sketches & Drawings',
    count: 3,
    unit: 'Files',
    status: 'missing',
    missingCount: 1,
    filePrefix: 'SKETCH',
    extension: 'pdf',
    captions: ['Elevation sketch', 'Cross-section sketch', 'Plan view sketch'],
  },
];

export function getCategory(key: string | undefined): FileCategory | undefined {
  return FILE_CATEGORIES.find((category) => category.key === key);
}

export type PhotoEntry = {
  id: string;
  filename: string;
  caption: string;
  date: string;
  categoryTitle: string;
};

export function getPhotosForCategory(category: FileCategory): PhotoEntry[] {
  return Array.from({ length: category.count }, (_, index) => {
    const n = index + 1;
    const num = String(n).padStart(3, '0');
    return {
      id: `${category.key}-${num}`,
      filename: `${BRIDGE.id}_${BRIDGE.inspectionYear}_${category.filePrefix}_${num}.${category.extension}`,
      caption: category.captions[index % category.captions.length],
      date: BRIDGE.surveyDate,
      categoryTitle: category.title,
    };
  });
}
