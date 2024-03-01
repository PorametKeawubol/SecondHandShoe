export default function YourMessage(data){


    
    return(
        <div class="flex justify-start mb-4 mr-10 items-end">
                    <img
                        src={data.data.pic}
                        class="object-cover h-8 w-8 rounded-full ring-1"
                        alt=""
                    />
                    <div className="flex flex-col">
                        <h className="text-slate-300">{data.data.Sender.attributes.username}</h>
                        <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        {data.data.text}
                        <img src={data.data.image}
                             class="object-cover h-auto w-[40%]"    
                        />
                    </div>
                    </div>
                    
        </div>
    );
}