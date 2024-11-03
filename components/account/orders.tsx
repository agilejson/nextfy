import { getCustomerOrdersAction } from '@/actions/customer'
import { formateDateToBr, formatPriceToBrl } from '@/lib/utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DEFAULT_OPTION, ORDER_STATUS } from '@/lib/constants'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { getCustomerAccessToken } from '@/actions/auth/session'

interface CustomerOrdersProps {
  page: number | undefined
}

export async function CustomerOrders({ page }: CustomerOrdersProps) {
  const customerAccessToken = await getCustomerAccessToken()

  if (!customerAccessToken) notFound()

  const data = await getCustomerOrdersAction({
    customerAccessToken: customerAccessToken,
    page: page,
  })

  if (!data) notFound()

  return (
    <div className="w-full">
      <pre className="bg-neutral-200">{JSON.stringify(data.orders, null, 2)}</pre>
      {data.orders.length > 0 ? (
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex flex-col gap-4 overflow-y-auto">
            {data.orders.map((order) => (
              <Accordion key={order.orderNumber} type="single" collapsible>
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="border border-black bg-white px-4 py-2 hover:no-underline data-[state=open]:border-b-transparent">
                    <table className="w-full">
                      <thead>
                        <tr className="text-center text-sm">
                          <th className="text-sm uppercase">Numero</th>
                          <th className="text-sm uppercase">Data</th>
                          <th className="text-sm uppercase">Status</th>
                          <th className="text-sm uppercase">Items</th>
                          <th className="text-sm uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center text-sm">
                          <td className="text-neutral-600">#{order.orderNumber}</td>
                          <td className="text-neutral-600">{formateDateToBr(order.processedAt)}</td>
                          <td className="text-neutral-600">
                            {order.fulfillmentStatus === 'FULFILLED' ? (
                              <p className="text-green-500">Confirmado</p>
                            ) : (
                              <p className="text-yellow-500">Preparando</p>
                            )}
                          </td>
                          <td className="text-neutral-600">{order.lineItems.length}</td>
                          <td className="text-neutral-600">{formatPriceToBrl(order.totalPrice.amount)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="border border-black border-t-transparent px-4">
                      <div className="flex flex-col justify-between gap-4 border-t border-black py-4">
                        <a
                          href={order.statusUrl}
                          className="flex w-max items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          Mais detalhes e rastreio
                          <ArrowUp className="w-4 rotate-45" />
                        </a>
                        {order.lineItems.map((item) => (
                          <div key={item.variant.id} className="flex justify-between">
                            <div className="flex gap-2">
                              <div className="flex h-20 w-20 items-center justify-center border border-black">
                                <Image src={item.variant.image?.url} alt="" width={50} height={50} />
                              </div>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm">{item.title}</p>
                                {item.variant.title !== DEFAULT_OPTION && (
                                  <p className="text-neutral-600">{item.variant.title}</p>
                                )}
                                <p>quantidade: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <p className="text-sm font-semibold">{formatPriceToBrl(item.variant.price?.amount)}</p>
                              {item.variant.compareAtPrice && (
                                <p className="text-neutral-500 line-through">
                                  {formatPriceToBrl(item.variant.compareAtPrice.amount)}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex w-full items-center justify-between py-3">
                          <p>Subtotal</p>
                          <p>{formatPriceToBrl(order.subtotalPrice?.amount)}</p>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-400" />
                        <div className="flex w-full items-center justify-between py-3">
                          <p>Frete</p>
                          <p>{formatPriceToBrl(order.totalShippingPrice.amount)}</p>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-400" />
                        <div className="flex w-full items-center justify-between py-3">
                          <p>Taxas</p>
                          <p>{formatPriceToBrl(order.totalTax?.amount)}</p>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-400" />
                        <div className="flex w-full items-center justify-between py-3">
                          <p className="font-semibold">Total</p>
                          <p className="font-semibold">{formatPriceToBrl(order.totalPrice.amount)}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
          {data.pageInfo.hasNextPage && (
            <Link
              href={Number(page) ? `/account/orders?page=${Number(page) + 1}` : `/account/orders?page=2`}
              className="m-auto mt-10 w-max bg-black p-2 text-white"
            >
              Carregar mais
            </Link>
          )}
        </div>
      ) : (
        <span className="m-auto text-xl">Você não tem nenhum pedido.</span>
      )}
    </div>
  )
}
