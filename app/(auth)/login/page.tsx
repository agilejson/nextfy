import Link from 'next/link'
import { Metadata } from 'next'
const { SITE_NAME } = process.env

export const metadata: Metadata = {
  title: `Login | ${SITE_NAME}`,
  description: 'Generated by create next app',
}

export default function Login() {
  return (
    <div>
      <Link href="/" className="m-auto my-5 flex w-max text-lg font-semibold">
        Nextfy
      </Link>
      <div className="absolute left-1/2 top-1/2 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2">
        <h1 className="mb-4">Fazer login</h1>
        <form className="flex flex-col gap-4">
          <input placeholder="Email" className="w-full border border-zinc-700 px-4 py-2" />
          <input placeholder="Senha" className="w-full border border-zinc-700 px-4 py-2" />
          <Link href="#" className="text-sm underline">
            Esqueci minha senha
          </Link>
          <button className="bg-black py-2 text-white">Entrar</button>
          <Link href="/signup" className="text-center text-sm underline">
            Criar conta
          </Link>
        </form>
      </div>
    </div>
  )
}
