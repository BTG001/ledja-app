export default function Switch({ on, onChangeOn }) {
    return (
        <>
            <div
                onClick={() => {
                    onChangeOn(!on);
                }}
                className={` w-12 h-max cursor-pointer relative  flex flex-row flex-nowrap  items-center
        ${on ? "justify-end" : "justify-start"}`}
            >
                <p className="absolute w-12 h-4  bg-primary-40 rounded-lg"></p>
                <p className="absolute w-6 h-6 z-10 bg-white rounded-full shadow-md border border-solid border-my-gray-40"></p>
            </div>
        </>
    );
}
