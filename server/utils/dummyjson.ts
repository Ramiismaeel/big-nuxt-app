import type { FetchError } from 'ofetch'
import type { z } from 'zod'

export async function dummyGet<S extends z.ZodType>(
  path: string,
  schema: S,
  query?: Record<string, unknown>,
): Promise<z.infer<S>> {
  const { dummyjson } = useRuntimeConfig()

  // 1. Fetch
  let raw: unknown
  try {
    raw = await $fetch(path, { baseURL: dummyjson.baseUrl, query, timeout: 5000 })
  }
  catch (error) {
    throw toHttpError(error as FetchError)
  }

  // 2. Validate
  const result = schema.safeParse(raw)
  if (!result.success) {
    console.error('DummyJSON returned unexpected data', result.error.issues)
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway',
      data: import.meta.dev ? result.error.issues : undefined,
    })
  }

  // 3. Return typed data
  return result.data
}

function toHttpError(error: FetchError) {
  const status = error.statusCode
  if (status === undefined) return createError({ statusCode: 504, statusMessage: 'Upstream unavailable' })
  if (status === 404) return createError({ statusCode: 404, statusMessage: 'Not Found' })
  if (status >= 500) return createError({ statusCode: 502, statusMessage: 'Bad Gateway' })
  return createError({ statusCode: 400, statusMessage: 'Bad Request' })
}
