'use client'
import { ProductVariants } from '@/lib/shopify/types'
import { Image } from '@/lib/shopify/types/storefront.types'
import { useSearchParams } from 'next/navigation'

interface AddToCartProps {
  variants: ProductVariants
  availableForSale: boolean | undefined
  images?: Image
}

export function AddToCart({ variants, availableForSale }: AddToCartProps) {
  const searchParams = useSearchParams()

  if (!variants) return null

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined

  const variant = variants.find((variant) =>
    variant.selectedOptions.every((option) => option.value === searchParams.get(option.name.toLowerCase())),
  )

  const selectedVariantId = variant?.id || defaultVariantId

  if (!availableForSale) {
    return (
      <button aria-disabled className="cursor-not-allowed bg-black/70 py-2 text-white">
        Fora de estoque
      </button>
    )
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className="cursor-not-allowed bg-black/70 py-2 text-white"
      >
        <div className="absolute left-0 ml-4"></div>
        Selecione a variante
      </button>
    )
  }

  return (
    <button aria-label="Add to cart" className="bg-black py-2 text-white">
      Adicionar ao carrinho
    </button>
  )
}
