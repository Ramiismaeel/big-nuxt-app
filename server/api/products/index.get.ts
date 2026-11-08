import { z } from 'zod'
import { ProductListQuerySchema, ProductSummarySchema } from '#shared/products'

const DummyProductList = z.object({
  products: z.array(ProductSummarySchema),
  total: z.number(),
})

export default defineEventHandler(async (event) => {
  const { page, limit } = await getValidatedQuery(event, ProductListQuerySchema.parse)

  const data = await dummyGet('/products', DummyProductList, {
    limit,
    skip: (page - 1) * limit,
    select: Object.keys(ProductSummarySchema.shape).join(','),
  })

  return toPaginated(data.products, data.total, page, limit)
})
