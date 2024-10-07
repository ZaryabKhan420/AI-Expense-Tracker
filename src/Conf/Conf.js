export const Conf = {
  VITE_DRIZZLE_DATABASE_URL: String(import.meta.env.VITE_DRIZZLE_DATABASE_URL),
  VITE_CLERK_PUBLISHABLE_KEY: String(
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  ),
  VITE_GEMINI_API_KEY: String(import.meta.env.VITE_GEMINI_API_KEY),
};
