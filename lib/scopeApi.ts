import type React from 'react';

export const BASE_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;
const headers = { 'Content-Type': 'application/json' };

type FormDataEntryValue = string | File;

type GetFormValuesReturn = {
  [k: string]: FormDataEntryValue;
};

export function getFormValues(event: React.FormEvent): GetFormValuesReturn | null {
  if (!event?.currentTarget) return null;

  const data = new FormData(event.currentTarget as HTMLFormElement);
  return Object.fromEntries(data.entries());
}

export function saveAuthData(token: string): void {
  localStorage.setItem('token', token);
}
export function getTokenFromLocalStorage(): string | null {
  if (!window) return null;
  return localStorage.getItem('token');
}

export async function getJWTToken(
  email: FormDataEntryValue,
  password: FormDataEntryValue,
): Promise<any | undefined> {
  const body = JSON.stringify({ email, password });
  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };

  try {
    const fetchResponse = await fetch(`${BASE_URL}/login-post`, requestOptions);
    if (!fetchResponse.ok) {
      throw new Error(`HTTP status ${fetchResponse.status}`);
    }
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return {
      errorMessage: e,
    };
  }
}
