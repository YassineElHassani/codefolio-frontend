import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
  query GetPortfolio {
    getPortfolio {
      profile {
        id
        name
        title
        bio
        avatarUrl
        social {
          platform
          icon
          url
        }
      }
      projects {
        id
        title
        description
        skills
        url
        image
      }
      skills {
        id
        name
        level
        icon
      }
      experiences {
        id
        company
        role
        startDate
        endDate
        details
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      name
      title
      bio
      avatarUrl
      social {
        platform
        icon
        url
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      title
      description
      skills
      url
      image
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      title
      description
      skills
      url
      image
    }
  }
`;

export const GET_SKILLS = gql`
  query GetSkills {
    getSkills {
      id
      name
      level
      icon
    }
  }
`;

export const GET_SKILL = gql`
  query GetSkill($id: ID!) {
    getSkill(id: $id) {
      id
      name
      level
      icon
    }
  }
`;

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      company
      role
      startDate
      endDate
      details
    }
  }
`;

export const GET_EXPERIENCE = gql`
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
      id
      company
      role
      startDate
      endDate
      details
    }
  }
`;
