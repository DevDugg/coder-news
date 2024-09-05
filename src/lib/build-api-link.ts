import { apiUrl } from "@/routes";

const buildApiLink = (path: string): string => {
  return `${apiUrl}${path}`;
};

export default buildApiLink;
