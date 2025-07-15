import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Consultation: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      status: a.string().required().default('pending'),
      attachedFileUrl: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.group('admin'),
    ]),

  Action: a
    .model({
      consultationId: a.id().required(),
      actionType: a.string().required(),
      comment: a.string(),
    })
    .authorization((allow) => [
      allow.group('admin'),
    ]),

  User: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      role: a.string().required(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.group('admin'),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});