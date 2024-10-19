'use server'
import { cartIdCookie, ERROR_MESSAGES, TAGS } from '@/lib/constants'
import { addCartLine, createCart, getCart, updateCart } from '@/lib/shopify/fetch/cart'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { ActionStateType, CartType } from '@/lib/shopify/fetch/types'
import { removeFromCartMutation } from '@/lib/shopify/graphql/mutations/cart'
import { RemoveFromCartMutation } from '@/lib/shopify/types/storefront.generated'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function getCartId() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(cartIdCookie)?.value

  return cartId
}

export async function addProductToCartAction(merchandiseId: string): Promise<ActionStateType> {
  const cookieStore = await cookies()
  let cartId = await getCartId()
  let cart: CartType | undefined

  if (cartId) {
    cart = await getCart(cartId)
  }

  if (!cartId || !cart) {
    cart = await createCart()
    if (cart) {
      cartId = cart.id
      cookieStore.set(cartIdCookie, cartId, { maxAge: 604800 })
    }
  }

  if (!cartId) {
    return { errors: { message: ERROR_MESSAGES.addProductToCart } }
  }

  const { errors } = await addCartLine(cartId, merchandiseId)

  if (errors) {
    return { errors: { message: errors?.message } }
  }

  revalidateTag(TAGS.cart)
  return { errors: undefined }
}

type Payload = {
  lineId: string
  variantId: string
  quantity: number
}

export async function updateItemQuantityAction({ lineId, variantId, quantity }: Payload): Promise<ActionStateType> {
  const cartId = await getCartId()

  if (!cartId) {
    return { errors: { message: ERROR_MESSAGES.updateItemQuantity } }
  }

  if (quantity <= 0) {
    await removeCartItemAction(cartId, lineId)
    revalidateTag(TAGS.cart)
    return { errors: undefined }
  }

  const { errors } = await updateCart(cartId, [{ id: lineId, merchandiseId: variantId, quantity }])

  if (errors) {
    return { errors: { message: 'sd' } }
  }

  revalidateTag(TAGS.cart)
  return { errors: undefined }
}

export async function removeCartItemAction(cartId: string, lineId: string) {
  const { data } = await shopifyFetch<RemoveFromCartMutation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds: lineId,
    },
  })

  if (data?.cartLinesRemove?.cart) {
    revalidateTag(TAGS.cart)
  }
}
