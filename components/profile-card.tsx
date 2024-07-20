import Link from 'next/link'

export function ProfileCard() {
  return (
    <div className="flex w-full max-w-[260px] flex-col justify-between bg-black px-5 py-10">
      <div>
        <div className="mb-10 flex flex-col gap-2">
          <div className="flex h-14 w-14 items-center justify-center bg-zinc-900">
            <span>MG</span>
          </div>
          <div className="flex flex-col">
            <span>Mateus Gustavo</span>
            <span className="text-neutral-300">mateus@gmail.com</span>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-8">
            <Link href="/account/profile" className="text-neutral-300">
              Pedidos
            </Link>
            <Link href="/account/address" className="text-neutral-300">
              Endereços
            </Link>
          </div>
        </div>
      </div>
      <div>
        <button className="w-max text-neutral-300 underline">Sair da conta</button>
      </div>
    </div>
  )
}
