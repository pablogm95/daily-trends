export const Config = {
  HTTP_PORT: Number(process.env.PORT) || 8080,
  MONGODB_URL: process.env.MONGODB_URL!,
}
