import Link from 'next/link'
import { Metadata } from 'next'
const { SITE_NAME } = process.env

export const metadata: Metadata = {
  title: `${SITE_NAME} | Criar uma conta`,
  description: 'Generated by create next app',
}

export default function SignUp() {
  return (
    <div>
      <Link href="/" className="m-auto my-5 flex w-max text-lg font-semibold">
        Nextfy
      </Link>
      <div className="absolute left-1/2 top-1/2 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="mb-4">Criar conta</h1>
        <form className="flex flex-col gap-4">
          <input placeholder="Nome" className="w-full border px-4 py-2" />
          <input placeholder="Sobrenome" className="w-full border px-4 py-2" />
          <input placeholder="Email" className="w-full border px-4 py-2" />
          <input placeholder="Senha" className="w-full border px-4 py-2" />

          <button className="bg-black py-2 text-white">Criar conta</button>
          <Link href="/login" className="text-sm underline">
            Fazer login
          </Link>
        </form>
      </div>
    </div>
  )
}
