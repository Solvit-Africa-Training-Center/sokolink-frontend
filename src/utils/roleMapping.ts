// src/utils/roleMapping.ts
export const ROLE_MAPPING: { [key: string]: string } = {
  '085d51f9-c192-4297-8bee-63fbf3bae3f7': 'retailer',
  // Add other role mappings here as you discover them
};

export const getRoleName = (roleId: string): string => {
  const roleName = ROLE_MAPPING[roleId] || 'unknown';
  console.log(`🔍 Role Mapping: "${roleId}" → "${roleName}"`);
  return roleName;
};