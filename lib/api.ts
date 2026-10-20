const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const isFormData = init.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers:
      init.body && !isFormData
        ? { "Content-Type": "application/json", ...init.headers }
        : init.headers,
  });

  if (!res.ok) {
    throw new ApiError(`Request failed (${res.status})`, res.status);
  }

  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
