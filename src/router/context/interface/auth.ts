export enum Role {
  ADMIN = "admins",
  USER = "user",
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export type AuthContextTypeProps = {
  user: UserAccount | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserAccount>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<UserAccount>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
  getDashboardUrl: (userRole: string) => string;
};

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
