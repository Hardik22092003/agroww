function BannerNav() {
    return ( 
        <div className="flex justify-between items-center  p-3 rounded-md border-2">
            <div className="text-gray-400">
                <p>Select Operation</p>
            </div>
            <div className="flex">
                <p className="bg-purple-600 text-white text-md p-2 rounded-md">+ Create Contract</p>
                <p className="text-md p-2">Update Contract</p>
            </div>
        </div>
     );
}

export default BannerNav;