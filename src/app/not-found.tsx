import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
  <div className="flex flex-col grow items-center justify-center">
    <h1 className=" font-semibold text-xl">Error 404</h1>
  <h1 className="text-lg">{`Página no encontrada. :(`}</h1>
  <Image src="/404.svg" width={500} height={500} alt="Error 404 image" className="w-full max-w-[500px]"/>
  <Link className="p-2 font-semibold text-lg bg-accent-500 rounded-md text-white" href={"/"}>Volver al inicio</Link>
  </div>
  )
}