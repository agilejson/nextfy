import Link from 'next/link'

export function ProfileCard() {
  return (
    <div className="flex w-full max-w-[260px] flex-col justify-between border border-black bg-white px-5 py-10">
      <div>
        <div className="mb-10 flex flex-col gap-2">
          <div className="flex h-14 w-14 items-center justify-center bg-zinc-300">
            <span>MG</span>
          </div>
          <div className="flex flex-col">
            <span>Mateus Gustavo</span>
            <span>mateus@gmail.com</span>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-8">
            <Link href="/orders" className="hover:underline">
              Pedidos
            </Link>
            <Link href="/address" className="hover:underline">
              Endereços
            </Link>
          </div>
        </div>
      </div>
      <div>
        <button className="w-max">Sair da conta</button>
      </div>
    </div>
  )
}
