export interface User {
  uid: string;
  email: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  role: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getDashboardUrl: (role: string) => string;
}

// Profile Dropdown

export interface ProfileDropdownProps {
  user: User;
}
