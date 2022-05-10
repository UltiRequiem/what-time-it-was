export function removeFromNow(hours: number | string) {
  const now = new Date();

  if (typeof hours === "string") {
    hours = parseInt(hours, 10);
  }

  now.setHours(now.getHours() - hours);

  return now.toLocaleString();
}

export function getQuery(query: string) {
  const { searchParams } = getQuery.params;

  const value = searchParams.get(query);

  return value;
}

getQuery.params = new URL(window.location.href);
