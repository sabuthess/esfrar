// import Image from "next/image";
"use client"

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

// import { ImageCard } from "@/components/ImageCard/ImageCard";
// import { useFetchImages } from "@/hooks/useFetchImages";

// import PhotoCard from "@components/PhotoCard/PhotoCard";
// import { useFetchImages } from "@hooks/useFetchImages";

export default function Home() {
  // const { data, loading, error } = useFetchImages();
  // const { data, error } = useFetchImages()

  return (
    <>
      <Header />
      {/* {loading && <div className="text-center text-4xl">Loading...</div>}
            {error && <div className="bg-red-500 w-2/3">Error: {error.message}</div>} */}

      <section className="flex flex-col items-center mx-auto relative">
        <main className="w-4/5 column-1 sm:columns-2 md:columns-3 lg:columns-4">
{/*           {data && data.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              url_photo={image.file_path} />
          ))} */}
        </main>

        <div className='m-4 w-[90%]  sm:w-4/5 flex flex-col gap-5 relative z-10'>
          <h3 className='font-bold text-xl sm:text-2xl'>
            Imágenes gratuitas que puedes buscar en Esfrar
          </h3>
          <p className='text-sm sm:text-base'>

            Esfrar es una comunidad vibrante de creativos que comparte imágenes libres de regalías.
            Todo el contenido es publicado por Esfar bajo la Licencia de Contenido, lo que garantiza su uso seguro sin necesidad de pedir permiso ni dar crédito al artista, incluso para ciertos fines comerciales.
          </p>
          <a
            href='#'
            className='text-center w-[80%] sm:w-[60%] md:w-[15%] lg:w-[30%] p-3 bg-teal-600 hover:bg-teal-700 text-white '>
            Conozca más sobre nuestra licencia
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}