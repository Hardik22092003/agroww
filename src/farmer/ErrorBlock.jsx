function ErrorBlock() {
    return ( 
          <div className="text-yellow-600 bg-yellow-100 flex items-start p-3 gap-2 rounded-lg">
            <div>
              <svg class="w-6 h-6 text-gray-800 dark:text-yellow-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M4 4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4H4Zm0 6h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm10.707 5.707a1 1 0 0 0-1.414-1.414l-.293.293V12a1 1 0 1 0-2 0v2.586l-.293-.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2Z" clip-rule="evenodd"/>
</svg>



                </div>

                <div className="flex flex-col gap-2">
                    <div className="gap-1">

                    <p className="font-bold text-md ">Document 01 Unverified</p>
                    <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis pariatur eos autem! Veritatis adipisci iure repellendus? In delectus hic nesciunt.</p>
                    </div>
                    <p className="font-bold">
                        View Details &rarr;
                    </p>
                </div>
        </div>
     );
}

export default ErrorBlock;