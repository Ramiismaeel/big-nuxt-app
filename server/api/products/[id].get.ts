import { z } from 'zod'
import { ProductSchema } from '#shared/products'
import { dummyGet } from '~~/server/utils/dummyjson'

const ParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, ParamsSchema.parse)

  return dummyGet(`/products/${id}`, ProductSchema)
})
