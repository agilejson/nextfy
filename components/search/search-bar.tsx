'use client'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { LoaderCircle, SearchIcon } from 'lucide-react'
import { FormEvent, useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { ProductType } from '@/lib/shopify/fetch/types'
import { productFirstVariantUrl, removeEdgesAndNodes } from '@/lib/utils'
import { searchProductsAction } from '@/actions/search'
import { useRouter } from 'next/navigation'

export function SearchModal() {
  const [inputValue, setInputValue] = useState('')
  const [searchResults, setSearchResults] = useState<ProductType[] | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[] | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    setRecentSearches(JSON.parse(localStorage.getItem('recentSearches') || '[]'))
  }, [])

  useEffect(() => {
    if (inputValue !== '') {
      const timeoutId = setTimeout(async () => {
        setSearchResults(null)
        startTransition(async () => {
          const products = await searchProductsAction({ query: inputValue })
          if (products) {
            setSearchResults(products.products)
          }
        })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
    setSearchResults(null)
  }, [inputValue])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsOpen(false)
    setInputValue('')

    let recentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]')

    if (!recentSearches.includes(inputValue) && inputValue !== '') {
      recentSearches.push(inputValue)
    }

    if (recentSearches.length > 5) {
      recentSearches.shift()
    }

    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))

    setRecentSearches(recentSearches.reverse())

    router.push(inputValue ? `/search?query=${inputValue}` : '/search')
  }

  function handleClearRecentSearches() {
    localStorage.setItem('recentSearches', JSON.stringify([]))
    setRecentSearches([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <button aria-label="Pesquisar produto" className="outline-none">
          <SearchIcon size={24} />
        </button>
      </DialogTrigger>
      <DialogContent className="absolute left-1/2 top-20 z-50 w-full max-w-[700px] -translate-x-1/2 translate-y-0 flex-col bg-white p-6">
        <DialogHeader className="mb-4">
          <DialogTitle>Pesquisar produtos</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="relative flex w-full">
            <input
              placeholder="Nome do produto"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-zinc-600 py-2 pl-4"
            />
            <button
              type="button"
              data-active={inputValue !== ''}
              onClick={() => setInputValue('')}
              className="absolute right-4 top-1/2 hidden -translate-y-1/2 data-[active=true]:block"
            >
              X
            </button>
          </div>
        </form>
        <ul className="my-6 flex flex-col gap-2">
          {isPending && <LoaderCircle className="animate-spin" />}
          {searchResults && searchResults.length <= 0 && <span>Nenhum resultado encontrado</span>}
          {searchResults?.map((product) => {
            const productUrl = productFirstVariantUrl(removeEdgesAndNodes(product.variants), product.handle)

            return (
              <li key={product.id}>
                <DialogClose asChild>
                  <Link href={productUrl} className="hover:underline">
                    {product.title}
                  </Link>
                </DialogClose>
              </li>
            )
          })}
        </ul>
        {searchResults && searchResults.length >= 5 && (
          <div className="flex w-full justify-end">
            <DialogClose asChild>
              <Link href={`/search?query=${inputValue}`} className="hover:underline">
                Ver todos: <strong>{inputValue}</strong>
              </Link>
            </DialogClose>
          </div>
        )}
        {recentSearches && recentSearches.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex w-full max-w-[300px] items-center gap-4">
              <span className="text-sm">Pesquisas recentes</span>
              <button onClick={handleClearRecentSearches} className="border border-black px-2 text-xs">
                Limpar
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {recentSearches.map((item, index) => (
                <li key={index}>
                  <DialogClose asChild>
                    <Link href={`/search?query=${item}`} className="flex items-center gap-2 text-sm hover:underline">
                      <SearchIcon size={14} />
                      {item}
                    </Link>
                  </DialogClose>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
