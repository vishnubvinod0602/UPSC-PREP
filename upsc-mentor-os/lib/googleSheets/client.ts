const BASE_URL = "/api/sheets";

export async function fetchSheet<T>(
  sheet: string,
  params?: Record<string, string>
): Promise<T[]> {
  const query = new URLSearchParams({
    sheet,
    ...(params ?? {}),
  });

  const res = await fetch(`${BASE_URL}?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

async function postAction<T>(
  action: string,
  sheet: string,
  payload: Record<string, unknown>
): Promise<T> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      sheet,
      ...payload,
    }),
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return await res.json();
}

export function addRow(
  sheet: string,
  data: unknown
) {
  return postAction("add", sheet, { data });
}

export function updateRow(
  sheet: string,
  id: string,
  data: unknown
) {
  return postAction("update", sheet, {
    id,
    data,
  });
}

export function deleteRow(
  sheet: string,
  id: string
) {
  return postAction("delete", sheet, {
    id,
  });
}

export async function importSheet(
  sheet: string,
  data: unknown[]
) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "import",
      sheet,
      data,
    }),
  });

  if (!res.ok) {
    throw new Error("Import failed");
  }

  return await res.json();
}