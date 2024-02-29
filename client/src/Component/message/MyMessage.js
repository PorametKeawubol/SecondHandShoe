export default function MyMessage(data) {
    return (
        <div class="flex justify-end mb-4 ml-10 items-end">
            <div className="flex flex-col">
                <h className="text-slate-300">{data.data.sender}</h>
                <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    {data.data.text}
                </div>
            </div>
            <img
                src={data.data.pic}
                class="object-cover h-8 w-8 rounded-full ring-1"
                alt=""
            />
        </div>
    );
}
