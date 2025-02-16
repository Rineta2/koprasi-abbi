export interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getDashboardUrl: (role: string) => string;
}

// Login Modal

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Menu Overlay

export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

// Profile Dropdown

export interface ProfileDropdownProps {
  user: User;
}
