export const Config = {
  HTTP_PORT: Number(process.env.PORT) || 8080,
  MONGODB_URI: process.env.MONGODB_URI!,
  MONGODB_USERNAME: encodeURIComponent(process.env.MONGODB_USERNAME!),
  MONGODB_PASSWORD: encodeURIComponent(process.env.MONGODB_PASSWORD!),
}
