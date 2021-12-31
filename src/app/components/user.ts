export type Role = 'admin' | 'manager' | 'user';
export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
   address?: string;
   dob?: Date;
   phoneNumber: string;
}
