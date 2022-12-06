import { API_URL } from "../../config/config";
import { apiFetch } from "../../query-client/baseFetcher";
import { GET } from "../../query-client/constants";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";

export type QueryParams = { categoryId: string; cursor: string };

export type EnvironmentsData = {
  success: boolean;
  data: {
    data: Array<{ id: number; name: string; string_id: string }>;
    next_cursor: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_cursor: string | null;
    prev_page_url: string | null;
  };
};

export type EnvironmentPath = {
  params: {
    string_id: string;
  };
};

/**Used for getting paths of SSG Environment details pages*/
export const getAllEnvironmentPaths = async () => {
  const paths: EnvironmentPath[] = [];

  const recursiveGetEnvironmentPath = async (cursor: string | null = INITIAL_PAGE_CURSOR) => {
    if (!cursor) return;

    const res = await getEnvironments({ categoryId: ALL_CATEGORIES, cursor })();
    const next = res.data.next_cursor;
    res.data.data.forEach((environment) => paths.push({ params: { string_id: environment.string_id } }));

    await recursiveGetEnvironmentPath(next);
  };

  await recursiveGetEnvironmentPath();
  return paths;
};

/**Generate a dynamic fetcher function for react-query to use.*/
export function getEnvironments({ categoryId, cursor }: QueryParams) {
  return async function () {
    const isFilteredByCategory = categoryId !== ALL_CATEGORIES;

    if (isFilteredByCategory) {
      return await getFilteredEnvironments({ categoryId, cursor });
    }

    return await getUnfilteredEnvironments(cursor);
  };
}

async function getFilteredEnvironments({ categoryId, cursor }: QueryParams) {
  const baseEndpoint = `${API_URL}/categories/${categoryId}/environments`;
  const endpoint = generateEndpoint({ baseEndpoint, cursor });

  return (await apiFetch(endpoint, GET)) as EnvironmentsData;
}

async function getUnfilteredEnvironments(cursor: string) {
  const baseEndpoint = `${API_URL}/environments`;
  const endpoint = generateEndpoint({ baseEndpoint, cursor });

  return (await apiFetch(endpoint, GET)) as EnvironmentsData;
}

function generateEndpoint({ baseEndpoint, cursor }: { baseEndpoint: string; cursor: string }) {
  const cursorIsValid = checkCursor(cursor);

  if (cursorIsValid) {
    return `${baseEndpoint}?cursor=${cursor}`;
  }

  return baseEndpoint;
}

function checkCursor(cursor: string) {
  return cursor !== INITIAL_PAGE_CURSOR;
}
