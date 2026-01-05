"use client";

import {  useState } from "react";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
// import { Bounce, toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { useAuth } from "@/context/AuthContext";

export default function UploadImage() {
    // const { token } = useAuth();
    // const user = useSelector((state) => state.user.user);
    // const router = useRouter();

    // useEffect(() => {
    //     if (!token) {
    //         toast.error("Token no encontrado. Por favor inicia sesión nuevamente.");
    //         router.push("/login");
    //         return;
    //     }
    // }, [token, router]);

    const [inputValue, setInputValue] = useState({
        title: "",
        location: "",
        description: "",
    });

    const handleOnChangeInput = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
    };

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");

    const [tag, setTag] = useState({ title: "" });
    const [tags, setTags] = useState([]);
    const [isClient, setIsClient] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setImage(file);
        }
    };

    const handleOnClick = () => {
        if (tag.title.trim() !== "" && tags.length < 3) {
            setTags([...tags, tag.title]);
            setTag({ title: "" });
        }
    };

    const handleChangeInputTags = (event) => {
        setTag({ title: event.target.value });
    };

    const uploadImage = async (imageFile) => {
        if (!imageFile) {
            toast.error("Debes seleccionar una imagen antes de subir.");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageFile); // Confirma que backend espere "file"
        formData.append("title", inputValue.title);
        formData.append("user_id", user?.id);
        formData.append("tags", JSON.stringify(tags));
        formData.append("location", inputValue.location);

        try {
            const res = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + "/api/images/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // No fijar Content-Type, axios lo maneja
                    },
                }
            );
            // toast.success(`${res.data.message}`, {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: false,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "light",
            //     transition: Bounce,
            // });

            // Reset estados solo tras éxito
            setImage(null);
            setInputValue({
                title: "",
                location: "",
                description:""
            });
            setTags([]);
        } catch (err) {
            // toast.error(`Error al subir la imagen`, {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: false,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "light",
            //     transition: Bounce,
            // });
            console.error(
                "Error al subir la imagen:",
                err.response?.data || err.message
            );
        }
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        uploadImage(image);
    };

    // useEffect(() => {
    //     setIsClient(true);
    // }, []);

    return (
        <>
            <Header />
            <main className="w-full my-14">
                <form
                    className="w-full md:w-[60%]  mx-auto p-10 bg-neutral-50 border border-neutral-200 rounded-4xl"
                    method="post"
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex flex-col md:flex-row justify-between gap-20">
                        <div className="flex flex-col justify-center items-center ">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="border text-center border-dashed border-white text-white p-4 bg-neutral-700 cursor-pointer"
                            />
                            {isClient && image && typeof image === "object" && (
                                <div className="mt-4 h-full">
                                    <p className="text-lg mb-2">Vista previa:</p>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Vista previa"
                                        className="max-w-full max-h-64 border border-gray-300 rounded"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-6 w-[90%] ">
                            <div className="flex flex-col gap-1 w-full md:w-auto">
                                <label htmlFor="title" className="font-bold">
                                    Title
                                </label>
                                <input
                                    className="outline-none p-1.5 rounded-md border border-neutral-400"
                                    type="text"
                                    placeholder="Enter your title"
                                    id="title"
                                    onChange={handleOnChangeInput}
                                    value={inputValue.title}
                                    name="title"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full md:w-auto">
                                <label htmlFor="tags" className="font-bold">
                                    Tags
                                </label>
                                <input
                                    value={tag.title}
                                    onChange={handleChangeInputTags}
                                    className="outline-none p-1.5 rounded-md border border-neutral-400"
                                    type="text"
                                    placeholder="Enter your tags"
                                    id="tags"
                                />
                                <div className="flex justify-between">
                                    <div className="flex gap-3 items-center">
                                        {tags.length <= 10
                                            ? tags.map((e, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-black w-auto py-1 px-3 rounded-md text-white text-center"
                                                >
                                                    {e}
                                                </div>
                                            ))
                                            : ""}
                                    </div>
                                    <button
                                        type="button"
                                        className="text-blue-700 cursor-pointer"
                                        onClick={handleOnClick}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full md:w-auto">
                                <label htmlFor="location" className="font-bold ">
                                    Location
                                </label>
                                <input
                                    className="outline-none p-1.5 rounded-md border border-neutral-400"
                                    type="text"
                                    placeholder="Enter your location"
                                    id="location"
                                    name="location"
                                    value={inputValue.location}
                                    onChange={handleOnChangeInput}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full md:w-auto">
                                <label htmlFor="location" className="font-bold ">
                                    Description 
                                </label>
                                <textarea
                                    className="outline-none p-1.5 rounded-md border border-neutral-400"
                                    placeholder="Enter the description here  "
                                    id="description"
                                    name="description"
                                    value={inputValue.description}
                                    onChange={handleOnChangeInput}
                                    required
                                />
                            </div>
                            <div className="flex justify-center  ">
                                <button
                                    type="submit"
                                    className="w-full  md:w-[50%] text-white bg-blue-600 p-2 rounded-3xl cursor-pointer"
                                >
                                    Subir Imagen
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
}