export type CloudflareEnv = {
  DB: import('@cloudflare/workers-types').D1Database
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CloudflareEnv {}
  }
}
