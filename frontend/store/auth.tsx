import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { api, tokenStore, User } from "@/services/api";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  updateUser: (user: User) => void;
  signOut: () => Promise<void>;
};

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  sport: string;
  role: string;
  country: string;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const storedToken = await tokenStore.get();
        if (!storedToken) {
          return;
        }

        const response = await api<{ user: User }>("/auth/me");
        if (mounted) {
          setToken(storedToken);
          setUser(response.user);
        }
      } catch (_error) {
        await tokenStore.clear();
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      updateUser: setUser,
      signIn: async (email, password) => {
        const response = await api<{ token: string; user: User }>("/auth/login", {
          method: "POST",
          auth: false,
          body: JSON.stringify({ email, password }),
        });
        await tokenStore.set(response.token);
        setToken(response.token);
        setUser(response.user);
        router.replace("/(tabs)");
      },
      signUp: async (payload) => {
        const response = await api<{ token: string; user: User }>("/auth/signup", {
          method: "POST",
          auth: false,
          body: JSON.stringify(payload),
        });
        await tokenStore.set(response.token);
        setToken(response.token);
        setUser(response.user);
        router.replace("/(tabs)");
      },
      signOut: async () => {
        await tokenStore.clear();
        setToken(null);
        setUser(null);
        router.replace("/login");
      },
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
