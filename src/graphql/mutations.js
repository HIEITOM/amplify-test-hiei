export const createConsultation = `
  mutation CreateConsultation($input: CreateConsultationInput!) {
    createConsultation(input: $input) {
      id
      title
      content
      status
      attachedFileUrl
      createdAt
      updatedAt
      owner
    }
  }
`;

export const updateConsultation = `
  mutation UpdateConsultation($input: UpdateConsultationInput!) {
    updateConsultation(input: $input) {
      id
      title
      content
      status
      attachedFileUrl
      createdAt
      updatedAt
      owner
    }
  }
`;

export const createAction = `
  mutation CreateAction($input: CreateActionInput!) {
    createAction(input: $input) {
      id
      consultationId
      actionType
      comment
      createdAt
      updatedAt
    }
  }
`;

export const createUser = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`;