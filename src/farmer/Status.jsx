import ErrorBlock from "./ErrorBlock";
import StakeBlock from "./StakeBlock";

function Status() {
    return ( 
        <div className="border rounded-md flex flex-col w-[100%] mx-auto my-4">
            <div className="p-4">
                <p className="font-bold text-lg">Contract Summary</p>
                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <hr></hr>
            <div className="p-4 flex flex-col gap-4">   
                <div className="flex justify-between items-start mt-4">

                <p className="w-[50%] text-gray-600">Last Update</p>
                <p className="self-start w-[50%]">May 27,2025 Verifier Level 1</p>
                </div>
                <div className="flex justify-between items-start mt-4">

                <p className="w-[50%] text-gray-600">Current Status</p>
                <p className="self-start w-[50%] h-[100%]">
                    <div className="flex items-center justify-between border p-2 rounded-md rounded-b-none">
                        <div className="flex items-center gap-1">
        <svg class="w-5 h-5      text-gray-800 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
</svg>

                        <p>Verifier Level 0</p>
                        </div>
                        <p>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-400 dark:text-blue-900">24/5/2025</span>
                            {/* <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">24/5/2025</span> */}
                        </p>
                    </div>
                    <div className="flex items-center justify-between border p-2 rounded-md rounded-b-none">
                        <div className="flex items-center gap-1">
        <svg class="w-5 h-5      text-gray-800 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
</svg>

                        <p>Verifier Level 0</p>
                        </div>
                        <p>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-400 dark:text-blue-900">24/5/2025</span>
                            {/* <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">24/5/2025</span> */}
                        </p>
                    </div>
                    <div className="flex items-center justify-between border p-2 rounded-md rounded-b-none">
                        <div className="flex items-center gap-1">
        <svg class="w-5 h-5      text-gray-800 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
</svg>

                        <p>Verifier Level 0</p>
                        </div>
                        <p>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-400 dark:text-blue-900">24/5/2025</span>
                            {/* <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">24/5/2025</span> */}
                        </p>
                    </div>
                   
                    
                </p>
                </div>
            
                <div className="flex justify-between items-start mt-4">

                <p className="w-[50%] text-gray-600">Last Update</p>
                <p className="self-start w-[50%]">

                    <div>
                       <StakeBlock/>
                    </div>
                </p>
                </div>

                <div className="flex justify-between items-start mt-4">

                <p className="w-[50%] text-gray-600">Action Required</p>
                <p className="self-start w-[50%]">

                    <div>
                       <ErrorBlock/>
                    </div>
                </p>
                </div>

                </div>

        </div>
     );
}

export default Status;