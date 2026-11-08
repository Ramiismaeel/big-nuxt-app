import { z } from 'zod'

export const ProductListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
})

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string().optional(), // 🧪 leave as-is for now, see the exercise below
  sku: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  images: z.array(z.string()),
  thumbnail: z.string(),
})

// The list view only needs a few fields, so we ask DummyJSON for less (?select=)
export const ProductSummarySchema = ProductSchema.pick({
  id: true,
  title: true,
  price: true,
  discountPercentage: true,
  rating: true,
  stock: true,
  brand: true,
  category: true,
  thumbnail: true,
  availabilityStatus: true,
})

export const CategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
})

export type Product = z.infer<typeof ProductSchema>
export type ProductSummary = z.infer<typeof ProductSummarySchema>
export type Category = z.infer<typeof CategorySchema>

export const PRODUCT_SORT_FIELDS = ['title', 'price', 'rating', 'stock'] as const
