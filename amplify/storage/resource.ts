import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'harassmentAppStorage',
  access: (allow) => ({
    'consultations/*': [
      allow.authenticated.to(['read', 'write']),
      allow.group('admin').to(['read', 'write', 'delete']),
    ],
  }),
});