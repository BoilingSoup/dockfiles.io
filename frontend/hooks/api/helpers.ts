import { showNotification } from "@mantine/notifications";
import { notificationStyles } from "../../components/layout/styles";
import { User } from "../../contexts/AuthProvider";
import { apiFetch, authFetch } from "../../query-client/baseFetcher";
import { ALL_CATEGORIES } from "../../zustand-store/types";

export type QueryParams = {
  categoryId: string;
  cursor: string;
  searchParam: string;
};

export type EnvironmentsData = {
  success: boolean;
  data: {
    data: Array<{ id: number; name: string; string_id: string; comments_count: number }>;
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

export type EnvironmentDetailsData = {
  id: number;
  string_id: string;
  name: string;
  description: string;
  repo_owner: string;
  repo_name: string;
  repo_branch: string;
};

export type EnvironmentDetailsResponse = {
  success: boolean;
  data: EnvironmentDetailsData;
};

/** SSR helper */
export const getEnvironmentByStringId = async (stringId: string) => {
  return (await apiFetch.get(`environments/${stringId}`)) as EnvironmentDetailsResponse;
};

/** SSR helper */
export const getEnvironmentReadMe = async (url: string) => {
  return (await fetch(url)).text();
};

/**React Query fetcher functions*/
export function getEnvironments({ categoryId, cursor, searchParam }: QueryParams) {
  return async function () {
    const isFilteredByCategory = categoryId !== ALL_CATEGORIES;

    if (isFilteredByCategory) {
      return await getFilteredEnvironments({ categoryId, cursor, searchParam });
    }

    return await getUnfilteredEnvironments({ cursor, searchParam });
  };
}

async function getFilteredEnvironments({ categoryId, cursor, searchParam }: QueryParams) {
  const endpoint = `categories/${categoryId}/environments?cursor=${cursor}&search=${searchParam}`;

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

async function getUnfilteredEnvironments({ cursor, searchParam }: { cursor: string; searchParam: string }) {
  const endpoint = `environments?cursor=${cursor}&search=${searchParam}`;

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

export type CommentData = {
  id: number;
  content: string;
  environment_id: number;
  created_at: string;
  replies_count: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    is_admin: boolean;
  };
};

type CommentsPage = {
  success: boolean;
  data: CommentData[];
  meta: {
    per_page: number;
    next_cursor: string;
  };
};

export function getComments(stringId: string) {
  return function ({ pageParam = "" }) {
    const endpoint = `environments/${stringId}/comments?cursor=${pageParam}`;
    return apiFetch.get(endpoint) as Promise<CommentsPage>;
  };
}

export const getEnvironmentDetails = (stringId: string) => async () => {
  return (await apiFetch.get(`environments/${stringId}`)) as EnvironmentDetailsResponse;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export const attemptLogin = async (values: LoginFormValues) =>
  (await authFetch.post("login", { email: values.email, password: values.password })) as User;

export const loginErrorNotification = () =>
  showNotification({
    color: "red",
    title: "Invalid login!",
    message: "Your email or password is incorrect.",
    styles: notificationStyles,
  });

export const loginSuccessNotification = () => {
  showNotification({
    color: "lime",
    title: "Logged in!",
    message: "You were successfully logged in.",
    styles: notificationStyles,
  });
};
