import './Home.css'
import { useMediaQuery } from "../../Helpers/Screensizer";

const HomePage = () => {

    const isBigScreen = useMediaQuery("(min-width: 1280px)");

    return (
        <>
        <div className="container w-screen flex flex-row md:pl-4">
            <div className="w-full xl:w-2/5 px-4 md:ml-10 flex items-center flex-col ">
                <div className="bg-transparent text-center md:text-left text-4xl md:text-7xl leading-12 md:leading-20 font-bold my-15 tracking-wider">
                    <h1 className="text-[var(--foreground)]" >JUMP INTO <br/>THE WORLD OF</h1>
                    <h1 className="text-[var(--highlight-fuchsia)]">KNOWLEDGE</h1>
                    <h3 className="font-normal text-2xl md:text-3xl pt-10 tracking-normal">TRAIN YOUR MEMORY WITH US</h3>
                </div>
                <div>
                    <div className="flex flex-row justify-between mb-10">
                        <div className="flex flex-col items-center w-1/3 px-2 md:pl-0 text-center">
                            <h1 className="text-5xl p-2">📁</h1>
                            <h3>Create your own collections</h3>
                        </div>
                        <div className="flex flex-col items-center w-1/3 px-2 md:pl-0 text-center">
                            <h1 className="text-5xl p-2">🎮</h1>
                            <h3>Dive into learning games and quizes</h3>
                        </div>
                        <div className="flex flex-col items-center w-1/3 px-2 md:pl-0 text-center">
                            <h1 className="text-5xl p-2">🧠</h1>
                            <h3>Master your memory</h3>
                        </div>
                    </div>
                </div>
            </div>
            {isBigScreen && (
                <div className='w-3/5 relative'>              
                <div className='w-full flex flex-row absolute inset-0'>
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-70 clip-5"
                        style={{ backgroundImage: "url('../../../public/learn.jpeg')" }}
                    />
                </div>
            </div>
            )}
            
            
        </div>

        </>
    )
};
export default HomePage;