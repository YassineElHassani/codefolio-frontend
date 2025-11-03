import { useMutation, useQuery } from '@apollo/client';
import {
  LOGIN,
  LOGOUT,
  UPDATE_PROFILE,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  CREATE_SKILL,
  UPDATE_SKILL,
  DELETE_SKILL,
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
} from '../graphql/mutations';
import { GET_PROFILE, GET_PROJECTS, GET_SKILLS, GET_EXPERIENCES } from '../graphql/queries';
import authService from '../lib/authService';

/**
 * Hook for user authentication
 */
export const useAuth = () => {
  const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
    onCompleted: data => {
      const token = data.login.token;
      authService.setToken(token);
    },
  });

  const [logoutMutation, { loading: logoutLoading }] = useMutation(LOGOUT, {
    onCompleted: () => {
      authService.logout();
    },
  });

  const login = async (username, password) => {
    try {
      const result = await loginMutation({
        variables: { username, password },
      });
      return result.data.login;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.warn('Logout mutation failed, clearing local auth:', error);
      authService.logout();
    }
  };

  return {
    login,
    logout,
    loading: loginLoading || logoutLoading,
    error: loginError,
  };
};

/**
 * Hook for profile operations
 */
export const useProfile = () => {
  const { data, loading, error, refetch } = useQuery(GET_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });

  const [updateProfileMutation, { loading: updating }] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_PROFILE }],
  });

  const updateProfile = async input => {
    try {
      const result = await updateProfileMutation({
        variables: { input },
      });
      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error(result.errors[0]?.message || 'Update failed');
      }
      return result.data.updateProfile;
    } catch (err) {
      console.error('UpdateProfile Error:', {
        message: err.message,
        graphQLErrors: err.graphQLErrors,
        networkError: err.networkError,
      });
      throw err;
    }
  };

  return {
    profile: data?.getProfile ?? null,
    loading,
    error,
    updating,
    updateProfile,
    refetch,
  };
};

/**
 * Hook for projects operations
 */
export const useProjects = () => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS, {
    fetchPolicy: 'cache-and-network',
  });

  const [createProjectMutation, { loading: creating }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [updateProjectMutation, { loading: updating }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [deleteProjectMutation, { loading: deleting }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const createProject = async input => {
    const result = await createProjectMutation({ variables: { input } });
    return result.data.createProject;
  };

  const updateProject = async (id, input) => {
    const result = await updateProjectMutation({ variables: { id, input } });
    return result.data.updateProject;
  };

  const deleteProject = async id => {
    const result = await deleteProjectMutation({ variables: { id } });
    return result.data.deleteProject;
  };

  return {
    projects: data?.getProjects ?? [],
    loading,
    error,
    creating,
    updating,
    deleting,
    createProject,
    updateProject,
    deleteProject,
    refetch,
  };
};

/**
 * Hook for skills operations
 */
export const useSkills = () => {
  const { data, loading, error, refetch } = useQuery(GET_SKILLS, {
    fetchPolicy: 'cache-and-network',
  });

  const [createSkillMutation, { loading: creating }] = useMutation(CREATE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
  });

  const [updateSkillMutation, { loading: updating }] = useMutation(UPDATE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
  });

  const [deleteSkillMutation, { loading: deleting }] = useMutation(DELETE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
  });

  const createSkill = async input => {
    const result = await createSkillMutation({ variables: { input } });
    return result.data.createSkill;
  };

  const updateSkill = async (id, input) => {
    const result = await updateSkillMutation({ variables: { id, input } });
    return result.data.updateSkill;
  };

  const deleteSkill = async id => {
    const result = await deleteSkillMutation({ variables: { id } });
    return result.data.deleteSkill;
  };

  return {
    skills: data?.getSkills ?? [],
    loading,
    error,
    creating,
    updating,
    deleting,
    createSkill,
    updateSkill,
    deleteSkill,
    refetch,
  };
};

/**
 * Hook for experiences operations
 */
export const useExperiences = () => {
  const { data, loading, error, refetch } = useQuery(GET_EXPERIENCES, {
    fetchPolicy: 'cache-and-network',
  });

  const [createExperienceMutation, { loading: creating }] = useMutation(CREATE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }],
  });

  const [updateExperienceMutation, { loading: updating }] = useMutation(UPDATE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }],
  });

  const [deleteExperienceMutation, { loading: deleting }] = useMutation(DELETE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }],
  });

  const createExperience = async input => {
    const result = await createExperienceMutation({ variables: { input } });
    return result.data.createExperience;
  };

  const updateExperience = async (id, input) => {
    const result = await updateExperienceMutation({ variables: { id, input } });
    return result.data.updateExperience;
  };

  const deleteExperience = async id => {
    const result = await deleteExperienceMutation({ variables: { id } });
    return result.data.deleteExperience;
  };

  return {
    experiences: data?.getExperiences ?? [],
    loading,
    error,
    creating,
    updating,
    deleting,
    createExperience,
    updateExperience,
    deleteExperience,
    refetch,
  };
};
