import { useSearchParams } from "next/navigation";

const getEmailFromQueryParams = (paramKey: string): string | null => {
  const searchParams = useSearchParams();

  if (!searchParams) return null;

  const value = searchParams.get(paramKey);

  if (!value) return null;

  // Decode the value and replace the spaces with '+' if present
  const decodedValue = decodeURIComponent(value);

  // Replace spaces (' ') with the '+' sign
  return decodedValue.replace(/\s/g, "+");
};

export { getEmailFromQueryParams };
