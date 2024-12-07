import { create } from 'zustand';
import { endpoints } from '../config/endpoints'; // Define tus endpoints
import { GetMethod, PostMethod } from '../config/methodsHttp'; // Métodos HTTP personalizados

const usePermissionStore = create((set) => ({
  permissions: [],
  roles: [],
  rolePermissions: [],
  
  // Fetch permissions
  fetchPermissions: async () => {
    const data = await GetMethod(endpoints.permissions);
    set({ permissions: data });
  },
  
  // Fetch roles
  fetchRoles: async () => {
    const data = await GetMethod(endpoints.roles);
    set({ roles: data });
  },
  
  // Fetch role-permissions
  fetchRolePermissions: async () => {
    const data = await GetMethod(endpoints.rolePermissions);
    set({ rolePermissions: data });
  },
  
  // Create a new permission
  createPermission: async (permission) => {
    const data = await PostMethod(endpoints.permissions, permission);
    set((state) => ({ permissions: [...state.permissions, data] }));
  },

  // Create a new role
  createRole: async (role) => {
    const data = await PostMethod(endpoints.roles, role);
    set((state) => ({ roles: [...state.roles, data] }));
  },
  
  // Assign permission to role
  assignPermissionToRole: async (assignment) => {
    const data = await PostMethod(endpoints.rolePermissions, assignment);
    set((state) => ({ rolePermissions: [...state.rolePermissions, data] }));
  }
}));

export default usePermissionStore;
