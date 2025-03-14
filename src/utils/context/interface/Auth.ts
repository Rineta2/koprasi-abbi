export enum Role {
  SUPER_ADMIN = "super-admins",
  ADMIN = "admins",
  USER = "user",
}

export interface UserAccount {
  uid: string;
  email: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  role: Role;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface AuthContextType {
  user: UserAccount | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<UserAccount>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
  getDashboardUrl: (userRole: string) => string;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    username: string,
    phoneNumber: string
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  showInactiveModal: boolean;
  setShowInactiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}
