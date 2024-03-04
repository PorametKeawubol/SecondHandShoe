export default function YourMessage(data,pic) {
    console.log("🚀 ~ YourMessage ~ data:", data)
    return (
        <div className="flex justify-start mb-4 mr-10 items-end">
            <div className="h-8 w-8">
                <img
                    src={data.pic}
                    class="object-cover h-8 w-8 rounded-full ring-1"
                    alt=""
                />
            </div>
            <div className="flex flex-col">
                <h className="text-slate-300">
                    {data.data.Sender.attributes.username}
                </h>
                <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    {data.data.text}
                    <div>
                        <img
                            src={data.data.image}
                            class="object-cover max-h-[40%] max-w-52 rounded-full"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
