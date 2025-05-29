function ContractForm() {
    return (
        <div>
            <p className="text-center text-3xl font-bold my-3">Contract Form</p>
           

<form class="w-full ">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2  px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
      {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Contract Name"/>
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        City
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        State
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
    </div>
    <div className="flex mt-4   ">

    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Total Quantity
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Contract Name"/>
      {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
    </div>

    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Total Investors
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Contract Name"/>
      {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
    </div>
    <div class="w-full px-3 ">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Cost of Each Share
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Contract Name"/>
      {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
    </div>


    </div>
     <div className="max-w-1/2  p-6">
      <h2 className="text-xl font-semibold mb-2">Add Land Documents</h2>
      <p className="text-gray-600 mb-6">
        Upload images of your land documents. Ensure all details are clear and visible.
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="font-semibold mb-2">Upload Land Documents</p>
        <p className="text-gray-500 text-sm mb-4">
          Drag and drop or browse to upload your land documents. Accepted formats: JPG, PNG, PDF.
        </p>
        <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition">
          Browse Files
        </button>
      </div>
    </div>



     <div className="max-w-1/2  p-6">
      <h2 className="text-xl font-semibold mb-2">Add Collateral Documents</h2>
      <p className="text-gray-600 mb-6">
        Upload images of your Collateral documents. Ensure all details are clear and visible.
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="font-semibold mb-2">Upload Land Documents</p>
        <p className="text-gray-500 text-sm mb-4">
          Drag and drop or browse to upload your Collateral documents. Accepted formats: JPG, PNG, PDF.
        </p>
        <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition">
          Browse Files
        </button>
      </div>
    </div>
    <div class="flex p-6">
        <p className="w-fit bg-green-400 p-2 rounded-md ">Create Contract</p>
        <p className="p-2 w-fit">Cancel Contract</p>
    </div>
  </div>
  
</form>
        </div>
      );
}

export default ContractForm;