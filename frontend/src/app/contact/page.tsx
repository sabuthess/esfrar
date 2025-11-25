import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import Head from "next/head";


export default function Contact() {
    return (
        <>
        <Head>
            <title>Esfrar | Contact </title>
            <meta name="description" content="This is the section of get in touch with team of Esfrar" />
        </Head>
            <Header />
            <div className="relative ">
                <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(109,244,199,0.5)] opacity-50 blur-[80px]"></div></div>
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-1/2 " />
                </div>
                <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5 ">
                    <div className=" py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                        <div className="max-w-lg mx-auto">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Get in touch</h2>
                            <p className="mt-3 text-lg leading-6 text-gray-500">
                                Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
                                arcu.
                            </p>
                            <div className="flex flex-col gap-2 my-10">

                                <div className="flex gap-4 items-center">
                                    <hr className="border h-10 border-teal-500" />
                                    <p>Quito, Ecudor</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <hr className="border h-10 border-black" />
                                    <p>Av. y Santa Teresa</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <hr className="border h-10 border-black" />
                                    <p>Pomasqui</p>
                                </div>
                            </div>
                            <p className="mt-6 text-base text-gray-500">
                                Looking for careers?{' '}
                                <a href="#" className="font-medium text-gray-700 underline">
                                    View all job openings
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                        <div className="max-w-lg mx-auto lg:max-w-none">
                            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Full name
                                    </label>
                                    <input
                                        id="email"
                                        name="full-name"
                                        type="text"
                                        autoComplete="name"
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 border border-neutral-400  rounded-md"
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 border border-neutral-400  rounded-md"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="sr-only">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autoComplete="tel"
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 border border-neutral-400 rounded-md"
                                        placeholder="Phone"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 border border-neutral-400 rounded-md"
                                        placeholder="Message"
                                        defaultValue={''}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}