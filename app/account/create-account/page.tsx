import Link from 'next/link'

export default function CreateAccountPage() {
  return (
    <div>
      <Link href="/" className="m-auto my-5 flex w-max text-lg font-semibold">
        Nextfy
      </Link>
      <div className="absolute left-1/2 top-20 mt-10 w-full max-w-[500px] -translate-x-1/2 border border-zinc-700 bg-black p-5">
        <form className="flex flex-col gap-4">
          <input placeholder="Nome" className="w-full border border-zinc-700 bg-black px-4 py-2" />
          <input placeholder="Sobrenome" className="w-full border border-zinc-700 bg-black px-4 py-2" />
          <input placeholder="Email" className="w-full border border-zinc-700 bg-black px-4 py-2" />
          <input placeholder="Senha" className="w-full border border-zinc-700 bg-black px-4 py-2" />

          <button className="bg-white py-2 text-black">Criar conta</button>
          <Link href="/account/login" className="text-sm underline">
            Fazer login
          </Link>
        </form>
      </div>
    </div>
  )
}
