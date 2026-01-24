export const queryKeys = {
  me: () => ['me'] as const,
  buildingInfo: (slug: string) => ['building-info', slug] as const,
};
