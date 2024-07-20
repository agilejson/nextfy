import Image from 'next/image'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function AllProductsPage() {
  return (
    <div className="m-auto w-full max-w-screen-wrapper">
      <div className="items-between mt-10 flex w-full gap-6">
        <div className="shrink-0 px-5">
          <div>
            <span>Filtrar por</span>
            <div className="mt-2 flex flex-col gap-2">
              <Link href="#" className="underline">
                Novidades
              </Link>
              <Link href="#" className="underline">
                Maior preço
              </Link>
              <Link href="#" className="underline">
                Menor preço
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex w-full flex-wrap gap-3">
            {products.map((product, index) => (
              <Link href="/product" key={index}>
                <div className="relative h-[370px] w-[370px] bg-black">
                  <Image
                    src="https://nextjs-commerce-psi-opal.vercel.app/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0656%2F1454%2F5036%2Ffiles%2Fmba13-m3-midnight-gallery1-202402.png%3Fv%3D1721267948&w=1920&q=75 "
                    alt="Nome do produto"
                    style={{ objectFit: 'contain' }}
                    fill
                  />
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <span className="text-lg">Macbook Air</span>
                  <span>R$ 12.599,00</span>
                </div>
              </Link>
            ))}
          </div>
          <Pagination className="my-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export const products = [
  {
    title: 'Mackbook Air 13',
    price: 'R$ 12.599,00',
  },
  {
    title: 'Mackbook Pro 14',
    price: 'R$ 16.999,00',
  },
  {
    title: 'iPhone 13 Pro',
    price: 'R$ 9.499,00',
  },
  {
    title: 'iPad Pro 11',
    price: 'R$ 8.599,00',
  },
  {
    title: 'Apple Watch Series 7',
    price: 'R$ 3.999,00',
  },
  {
    title: 'AirPods Pro',
    price: 'R$ 2.299,00',
  },
  {
    title: 'Apple TV 4K',
    price: 'R$ 1.299,00',
  },
  {
    title: 'iPad Pro 11',
    price: 'R$ 8.599,00',
  },
  {
    title: 'Apple Watch Series 7',
    price: 'R$ 3.999,00',
  },
]
