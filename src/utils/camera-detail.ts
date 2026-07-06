/**
 * Animation and reveal constants for camera detail view
 */

export const CAMERA_DETAIL_REVEALS = {
  HERO_Y_OFFSET: 18,
  GALLERY_DELAY: 60,
  STORY_DELAY: 80,
  SPECS_DELAY: 140,
  RELATED_DELAY: 160,
} as const;

export type NavItem = {
  id: string;
  label: string;
};

export function getNavItems(camera: any): NavItem[] {
  const items = [
    { id: 'hero', label: 'Hero', show: true },
    {
      id: 'gallery',
      label: 'Gallery',
      show: Boolean(camera.gallery?.length || camera.image),
    },
    {
      id: 'story',
      label: 'Story',
      show: Boolean(camera.story || camera.description),
    },
    { id: 'specs', label: 'Specifications', show: Boolean(camera.specs?.length) },
    { id: 'related', label: 'Related', show: Boolean(camera.related?.length) },
  ];

  return items.filter((item) => item.show).map(({ id, label }) => ({ id, label }));
}
