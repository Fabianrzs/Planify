export interface UserInfo {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any; // Puedes reemplazar "any" con un tipo más específico si conoces la estructura de metadata
  multiFactor: any; // Puedes reemplazar "any" con un tipo más específico si conoces la estructura de multiFactor
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: any[]; // Puedes reemplazar "any" con un tipo más específico si conoces la estructura de providerData
  providerId: string;
  tenantId: string | null;
  uid: string;
}

export interface AuthData {
  additionalUserInfo: {
    isNewUser: boolean;
  };
  user: UserInfo;
}
