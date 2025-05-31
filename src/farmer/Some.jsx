function Some() {
    return (
        <div className="my-10 mx-auto">
            <p className="text-center text-3xl font-bold">Create New Investment</p>
            <p className="text-center">Investment is growth to Success</p>
            <div className="flex flex-col gap-6 items-center justify-center h-[100%]">

            <div className="bg-purple-200 px-24 py-28 rounded-full w-fit mt-14">
                <div className="rounded-full bg-purple-600 text-white text-md px-8 py-24 w-fit mx-auto">
                    Create Investment Now
                    
                </div>
            </div>
            
            <div className="flex">
                <p className="p-2 bg-purple-600 text-white rounded">Create Now +</p>
                <p className="p-2" onClick={()=>{
                    window.location.href = "/farmer";
                }}>Create Enquiry</p>
            </div>
            </div>
        </div>
      );
}

export default Some;