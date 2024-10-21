import { formatPriceToBrl } from '@/lib/utils'

interface CartResumeProps {
  subtotal: string
  total: string
  fee: string
  checkoutUrl: string
}

export function CartResume({ subtotal, total, fee, checkoutUrl }: CartResumeProps) {
  return (
    <section className="mb-8">
      <div className="flex w-full items-center justify-between">
        <span>Subtotal</span>
        <span>{formatPriceToBrl(subtotal)}</span>
      </div>
      <div className="my-3 h-[1px] w-full bg-black" />
      <div className="flex w-full items-center justify-between">
        <span>Taxas</span>
        <span className="uppercase">{formatPriceToBrl(fee)}</span>
      </div>
      <div className="my-3 h-[1px] w-full bg-black" />
      <div className="flex w-full items-center justify-between">
        <span>Entrega</span>
        <span className="uppercase">Gratis</span>
      </div>
      <div className="my-3 h-[1px] w-full bg-black" />
      <div className="flex w-full items-center justify-between">
        <span>Total</span>
        <span>{formatPriceToBrl(total)}</span>
      </div>
      <a href={checkoutUrl}>
        <button className="mt-6 w-full bg-black py-2 text-white">Finalizar compra</button>
      </a>
    </section>
  )
}
