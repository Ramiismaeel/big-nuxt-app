import { z } from 'zod'
import { CategorySchema } from '#shared/products'
import { dummyGet } from '~~/server/utils/dummyjson'

export default defineEventHandler(async () => {
  return dummyGet('products/categories', z.array(CategorySchema))
})
