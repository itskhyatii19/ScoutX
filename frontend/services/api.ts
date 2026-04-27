import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "athlete" | "scout" | "club" | "fan";
  sport: string;
  country: string;
  city?: string;
  bio?: string;
  avatar?: string;
  position?: string;
  club?: string;
  rating: number;
  followers?: string[];
  following?: string[];
};

export type Post = {
  _id: string;
  author: User;
  caption: string;
  sport: string;
  location?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  tags: string[];
  likes: string[];
  comments: { user: string; text: string; createdAt: string }[];
  createdAt: string;
};

const configuredUrl = Constants.expoConfig?.extra?.apiUrl as string | undefined;
export const API_URL = configuredUrl || "http://192.168.1.9:5000/api";
const TOKEN_KEY = "scoutx_token";

export const tokenStore = {
  get: () => SecureStore.getItemAsync(TOKEN_KEY),
  set: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clear: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false) {
    const token = await tokenStore.get();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || "ScoutX request failed");
  }

  return data as T;
}

export const mediaUrl = (path?: string) => {
  if (!path) {
    return undefined;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${API_URL.replace("/api", "")}${path}`;
};
