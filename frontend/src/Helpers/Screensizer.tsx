import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const getMatches = () =>
    typeof window !== "undefined" &&
    window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
