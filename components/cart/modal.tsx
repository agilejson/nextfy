import { ShoppingBag } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CartResume } from './resume'
import { CartItem } from './item'
import { getCart } from '@/lib/shopify/fetch/cart'
import { CartType } from '@/lib/shopify/fetch/types'
import { getCartId } from '@/actions/cart'

export async function CartModal() {
  const cartId = await getCartId()

  let cart: CartType | undefined

  if (cartId) {
    cart = await getCart(cartId)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          {cart && cart.totalQuantity > 0 && (
            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
              {cart.totalQuantity}
            </div>
          )}
          <ShoppingBag size={24} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[400px] border-black bg-white py-4">
        <SheetHeader>
          <SheetTitle className="text-black">Carrinho de compras</SheetTitle>
        </SheetHeader>
        {cart && cart.lines.length > 0 ? (
          <div className="flex h-full flex-col justify-between">
            <ul className="mt-6 flex flex-col gap-4 overflow-auto py-2">
              {cart.lines.map((item) => {
                const selectedVariant = item.merchandise.product.variants.edges.find(
                  (variant) => variant.node.id === item.merchandise.id,
                )

                const quantityAvailable = selectedVariant?.node.quantityAvailable

                if (item.quantity <= 0) return

                return (
                  <li key={item.id}>
                    <CartItem
                      id={item.id}
                      cartId={cart.id}
                      merchandiseId={item.merchandise.id}
                      title={item.merchandise.product.title}
                      variantTitle={item.merchandise.title}
                      price={selectedVariant?.node.price.amount}
                      image={selectedVariant?.node.image?.url}
                      quantity={item.quantity}
                      quantityAvailable={quantityAvailable ? quantityAvailable : 0}
                    />
                  </li>
                )
              })}
            </ul>
            <CartResume
              subtotal={cart.cost.subtotalAmount.amount}
              total={cart.cost.totalAmount.amount}
              fee={cart.cost.totalTaxAmount?.amount}
              checkoutUrl={cart.checkoutUrl}
            />
          </div>
        ) : (
          <span className="m-auto mt-20 block w-max text-xl font-bold">O carrinho está vazio :{'('}</span>
        )}
      </SheetContent>
    </Sheet>
  )
}
