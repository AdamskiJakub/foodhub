export const API_ROUTES = {
  LOGIN: "/api/login",
  REGISTER: "/api/register",
  CHANGE_PASSWORD: "/api/change-password",
  UPDATE_PROFILE: "/api/update-profile",
  RESTAURANT: "/api/restaurant",
  COMMENT_RESTAURANT: "/api/comment-restaurant",
  RATE_RESTAURANT: "/api/rate-restaurant",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 15,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const SOCIAL_LINKS = {
  PORTFOLIO: "https://portfolio-jakubs-projects-f8e02b26.vercel.app/",
  LINKEDIN: "https://www.linkedin.com/in/jakub-adamski/",
  GITHUB: "https://github.com/AdamskiJakub",
} as const;

export const LOCATIONS = [
  { slug: "bialystok", translationKey: "bialystok" },
  { slug: "warsaw", translationKey: "warsaw" },
] as const;

export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
