export const listConsultations = `
  query ListConsultations {
    listConsultations {
      items {
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
  }
`;

export const getConsultation = `
  query GetConsultation($id: ID!) {
    getConsultation(id: $id) {
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

export const listActions = `
  query ListActions($filter: ModelActionFilterInput) {
    listActions(filter: $filter) {
      items {
        id
        consultationId
        actionType
        comment
        createdAt
        updatedAt
      }
    }
  }
`;

export const listUsers = `
  query ListUsers {
    listUsers {
      items {
        id
        name
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;