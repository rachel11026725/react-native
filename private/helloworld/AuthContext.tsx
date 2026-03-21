/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * A simple AuthProvider that manages login/logout state.
 * Replace the stub `authenticate` function with a real API call.
 */
export function AuthProvider({children}: AuthProviderProps): React.ReactNode {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<string | null>(null);

  const login = React.useCallback(
    async (username: string, password: string): Promise<boolean> => {
      // Stub authentication — replace with a real API call.
      const success = username.length > 0 && password.length > 0;
      if (success) {
        setIsAuthenticated(true);
        setUser(username);
      }
      return success;
    },
    [],
  );

  const logout = React.useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return React.useContext(AuthContext);
}
