function StakeBlock() {
    return ( 
        <div className="text-blue-600 bg-blue-100 flex items-start p-3 gap-2 rounded-lg">
            <div>
               <svg class="w-6 h-6 text-gray-800 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z" clip-rule="evenodd"/>
</svg>


                </div>

                <div className="flex flex-col gap-2">
                    <div className="gap-1">

                    <p className="font-bold text-md ">Investor 01 Investement</p>
                    <p className="text-sm">June 30,2025 at 10:30 AM</p>
                    </div>
                    <p className="font-bold">
                        View Details &rarr;
                    </p>
                </div>
        </div>
     );
}

export default StakeBlock;