import FarmerDashComp from "./_FarmerComponents/FamerDash";
function FarmerDashAccess() {
    return ( 
        <div>
            <div className=" flex flex-wrap justify-between items-center gap-4 ">

            <FarmerDashComp></FarmerDashComp>
            <FarmerDashComp></FarmerDashComp>
            <FarmerDashComp></FarmerDashComp>

            </div>
        </div>
     );
}

export default FarmerDashAccess;