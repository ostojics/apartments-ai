export const queryKeys = {
  me: () => ['me'] as const,
  buildingInfo: (slug?: string, locale?: string) => ['building-info', slug ?? 'unknown', locale ?? 'unknown'] as const,
  buildings: () => ['buildings'] as const,
  tenantCheck: () => ['tenant-check'] as const,
};
