"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { ModalAuth } from "./ModalAuth";
import { Register } from "./Register";
import { Login } from "./Login";

export const Header = () => {
	const isLogin = false;
	const [clickBtnBars, setClickBtnBars] = useState(false);
	const [clickUserAvatar, setClickUserAvatar] = useState(false);
	const [inputValuSearch, setInputValueSearch] = useState("");
	const [valueBtnAuth, setValueBtnAuth] = useState("");
	const [isClickBtnAuth, setIsClickBtnAuth] = useState(false);

	const router = useRouter();

	// Obtener usuario y estado login desde Redux
	// const user = useSelector((state) => state.user.user); // asumiendo que guardas usuario en state.user.user
	// const isLogin = useSelector((state) => state.user.isLoggedIn); // o como definas en tu store

	const handleChangeInputForm = ({ target }: ChangeEvent<HTMLInputElement>) =>
		setInputValueSearch(target.value);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/images?search=${encodeURIComponent(inputValuSearch)}`);
	};

	const handleBtnBars = () => {
		setClickBtnBars(!clickBtnBars);
	};

	const handleUserMenu = () => {
		setClickUserAvatar(!clickUserAvatar);
	};

	const handleClickBtnLogout = () => {
		// dispatch(logout());
		router.push("/");
	};

	const handleClicBtnAuth = (event) => {
		setValueBtnAuth(event.target.innerText);
		setIsClickBtnAuth(true);
	};

	return (
		<>
			<header className='flex justify-between lg:justify-between py-3 px-2 lg:px-7 items-center gap-5 w-full'>
				<div className='flex w-3/5 gap-10'>
					<div className='flex items-center justify-center'>
						<Link href='/' className='text-3xl'>
							Esfrar
						</Link>
					</div>
					<form
						className='flex-1 flex gap-2 rounded-xl  border border-neutral-400  px-2 bg-gray-50'
						onSubmit={handleSubmit}>
						<button type='submit'>
							<CiSearch />
						</button>
						<input
							type='text'
							placeholder='Busca en Esfrar'
							className=' outline-none border-none bg-none p-1.5 w-full '
							onChange={handleChangeInputForm}
						/>
					</form>
				</div>

				{!isLogin ? (
					<div>
						<div className='cursor-pointer lg:hidden' onClick={handleBtnBars}>
							{/* <BarsIcon /> */}
						</div>
						<nav
							className={
								clickBtnBars
									? "w-[50%] h-[20%]  absolute top-10 right-5 gap-6  flex justify-center items-center bg-neutral-800 z-50 text-white py-4 rounded-2xl"
									: "hidden lg:flex lg:static lg:bg-none lg:top-0 "
							}>
							<div className='flex flex-col lg:flex lg:flex-row justify-center items-center gap-3 text-center'>
								<button
									onClick={handleClicBtnAuth}
									className='py-2 px-5 hover:outline hover:outline-gray-500 transition-all '>
									Sing in
								</button>

								<button onClick={handleClicBtnAuth} className='py-1.5 px-5 hover:outline hover:outline-gray-500 transition-all '>
									Register
								</button>
								<Link
									href='/upload-image'
									className='py-1.5 px-5 outline hover:bg-blue-500 hover:text-white transition-all '>
									Upload
								</Link>
							</div>
						</nav>
					</div>
				) : (
					<div>
						<div
							onClick={handleUserMenu}
							className='bg-neutral-900 flex justify-center items-center rounded-full cursor-pointer'>
							{/*                         <Image
                            src={`https://robohash.org/${"Unknow"}`}
                            alt="User Avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                        /> */}
						</div>
						{clickUserAvatar ? (
							<div className='absolute z-50 flex flex-col gap-2 top-15 right-3 w-52 bg-neutral-800 p-5 text-start rounded-lg text-white'>
								<p className='font-bold text-white truncate'>{"Unknow"}</p>
								<hr />
								<div className='hover:bg-blue-600 w-full p-2 rounded-lg hover:text-white hover:cursor-pointer'>
									<Link href='/upload-image'>Subir</Link>
								</div>
								<div className='hover:bg-neutral-100 w-full p-2 rounded-lg hover:text-black hover:cursor-pointer'>
									<Link href={`/users/${"hola"}`}>Mi Perfil</Link>
								</div>
								<div className='hover:bg-neutral-100 w-full p-2 rounded-lg hover:text-black hover:cursor-pointer'>
									<Link href={`/dashboard`}>Dashboard</Link>
								</div>
								<div
									onClick={handleClickBtnLogout}
									className='hover:bg-neutral-100 w-full p-2 rounded-lg hover:text-black hover:cursor-pointer'>
									<p>Cerrar Sesión</p>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				)}
			</header>

			<div className="w-full">
				<ModalAuth
					isOpen={isClickBtnAuth}
					onClose={() => setIsClickBtnAuth(false)}>
					{valueBtnAuth === "Sing in" ? <Login /> : <Register />}
				</ModalAuth>
			</div>
		</>
	);
};
