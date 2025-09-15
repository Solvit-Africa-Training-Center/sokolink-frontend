import {
    Users2Icon, UserXIcon, ShieldIcon, UserCheckIcon, SearchIcon, FilterIcon, MailIcon,
    PhoneIcon,
    CalendarIcon,
    ClockIcon,
    ShoppingBagIcon,
    EyeIcon,
    UserMinusIcon,
    WarehouseIcon,
    MessageSquare,} from "lucide-react";

function AllUsers() {

    return (
        <div>  <div className="">
            <h1 className="text-3xl font-bold  text-gray-800">
                User Management
            </h1>
            <p className=" text-gray-600">
                Manage users, verify accounts, and monitor platform activity
            </p>
        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[32px] items-center justify-center" >
                {/* Stat card start */}
                <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between flex-col items-center gap-2">
                    <Users2Icon color="#3C83F6" />
                    <p className="text-2xl text-gray-800">2,847</p>
                    <h3 className="text-1xl  text-gray-700">Total Users</h3>
                </div>
                {/* Stat card end */}
                {/* Stat card start */}
                <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between flex-col items-center gap-2">
                    <UserXIcon color="#E23636" />
                    <p className="text-2xl text-[#E23636]">2,847</p>
                    <h3 className="text-1xl  text-gray-700">Suspended users</h3>
                </div>
                {/* Stat card end */}
                {/* Stat card start */}
                <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between flex-col items-center gap-2">
                    <ShieldIcon color="#EEBD2B" />
                    <p className="text-2xl text-[#EEBD2B]">2,847</p>
                    <h3 className="text-1xl  text-gray-700">Pending Users</h3>
                </div>
                {/* Stat card end */}
                {/* Stat card start */}
                <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between flex-col items-center gap-2">
                    <UserCheckIcon color="#3FA63F" />
                    <p className="text-2xl text-[#3FA63F]">2,847</p>
                    <h3 className="text-1xl  text-gray-700">Verified users</h3>
                </div>
                {/* Stat card end */}
             
            </div>
            {/* End of cards */}
            <div className="mt-[32px] p-4 bg-white shadow rounded-[10px] flex gap-4">
                <div className="flex items-center gap-3 py-2 px-4 outline outline-gray-300 rounded-[8px]"><SearchIcon size={18} /><input type="text" placeholder="Search by name or business..." className="placeholder:text-[14px]  focus:outline-hidden block" /></div>
                <div className="px-4  bg-white items-center text-[14px] cursor-pointer  rounded-[8px] outline outline-gray-300 flex">
            <FilterIcon size={14}/>
                    
                    <select name="userType" id="userType" className="h-full focus:outline-hidden py-2 cursor-pointer px-4">
        
                        <option disabled selected className="border-0 px-2">User type </option>
                        <option value="all" className="border-0 px-2">Wholesaler </option>
                        <option value="all" className="border-0 px-2">Wholesaler</option>
                        <option value="all" className="border-0 px-2">Ratailer</option>
                </select>
            </div>
                <div className="px-4  bg-white items-center text-[14px] cursor-pointer  rounded-[8px] outline outline-gray-300 flex">
                    <select name="userType" id="userType" className="h-full focus:outline-hidden py-2 cursor-pointer px-4">
        
                        <option disabled selected className="border-0 px-2">Status </option>
                        <option value="all" className="border-0 px-2">Suspended </option>
                        <option value="all" className="border-0 px-2">Verified</option>
                        <option value="all" className="border-0 px-2">pending</option>
                </select>
            </div>
                <div className="px-4  bg-white items-center text-[14px] cursor-pointer  rounded-[8px] outline outline-gray-300 flex">
                    
                    <select name="userType" id="userType" className="h-full focus:outline-hidden py-2 cursor-pointer px-4">
        
                        <option disabled selected className="border-0 px-2">Verification </option>
                        <option value="all" className="border-0 px-2">reviewing</option>
                        <option value="all" className="border-0 px-2">Reviewed</option>
                </select>
            </div>
            </div>
            {/* end of filter */}
            <div className="grid gap-[20px] mt-[32px]">
                {/* review card start */}
                <div className="bg-white  rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
                    {/* LEFT COLUMN */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">John Smith</h2>
                                <div className="mt-2 flex items-center gap-2 flex-wrap">
                                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Wholesaler</span>
                                    <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">active</span>
                                    <span className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                        <ShieldIcon className="w-4 h-4 inline" />
                                        verified
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">ID: USR-001</p>
                            </div>

                        </div>

                        {/* Contact list */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li className="flex items-center gap-3">
                                <MailIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-gray-900">john@techsolutions.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium text-gray-900">+254712345678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <WarehouseIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Business:</span>
                                <span className="font-medium text-gray-900">Tech Solutions Ltd</span>
                            </li>
                        </ul>

                        {/* Revenue + actions */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-400">Total Revenue Generated:</p>
                            <p className="mt-2 text-lg font-semibold text-green-600">Rwf 230,000</p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <EyeIcon className="w-4 h-4" /> View Profile
                                </button>

                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <MessageSquare className="w-4 h-4" /> Send Message
                                </button>

                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-red-600 hover:bg-red-50"
                                    aria-label="Suspend user">
                                    <UserMinusIcon className="w-4 h-4" /> Suspend User
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full md:w-72 flex-shrink-0   ">
                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <CalendarIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Joined:</div>
                                    <div className="font-medium text-gray-900">2024-01-15</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Last Active:</div>
                                    <div className="font-medium text-gray-900">2 hours ago</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ShoppingBagIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Orders:</div>
                                    <div className="font-medium text-gray-900">45</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* review card end */}
                {/* review card start */}
                <div className="bg-white  rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
                    {/* LEFT COLUMN */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">John Smith</h2>
                                <div className="mt-2 flex items-center gap-2 flex-wrap">
                                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Wholesaler</span>
                                    <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">active</span>
                                    <span className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                        <ShieldIcon className="w-4 h-4 inline" />
                                        verified
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">ID: USR-001</p>
                            </div>

                        </div>

                        {/* Contact list */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li className="flex items-center gap-3">
                                <MailIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-gray-900">john@techsolutions.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium text-gray-900">+254712345678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <WarehouseIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Business:</span>
                                <span className="font-medium text-gray-900">Tech Solutions Ltd</span>
                            </li>
                        </ul>

                        {/* Revenue + actions */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-400">Total Revenue Generated:</p>
                            <p className="mt-2 text-lg font-semibold text-green-600">Rwf 230,000</p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <EyeIcon className="w-4 h-4" /> View Profile
                                </button>

                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <MessageSquare className="w-4 h-4" /> Send Message
                                </button>

                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-red-600 hover:bg-red-50"
                                    aria-label="Suspend user">
                                    <UserMinusIcon className="w-4 h-4" /> Suspend User
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full md:w-72 flex-shrink-0   ">
                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <CalendarIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Joined:</div>
                                    <div className="font-medium text-gray-900">2024-01-15</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Last Active:</div>
                                    <div className="font-medium text-gray-900">2 hours ago</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ShoppingBagIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Orders:</div>
                                    <div className="font-medium text-gray-900">45</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* review card end */}
                {/* review card start */}
                <div className="bg-white  rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
                    {/* LEFT COLUMN */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">John Smith</h2>
                                <div className="mt-2 flex items-center gap-2 flex-wrap">
                                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Wholesaler</span>
                                    <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">active</span>
                                    <span className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                        <ShieldIcon className="w-4 h-4 inline" />
                                        verified
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">ID: USR-001</p>
                            </div>

                        </div>

                        {/* Contact list */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li className="flex items-center gap-3">
                                <MailIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-gray-900">john@techsolutions.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium text-gray-900">+254712345678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <WarehouseIcon className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Business:</span>
                                <span className="font-medium text-gray-900">Tech Solutions Ltd</span>
                            </li>
                        </ul>

                        {/* Revenue + actions */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-400">Total Revenue Generated:</p>
                            <p className="mt-2 text-lg font-semibold text-green-600">Rwf 230,000</p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <EyeIcon className="w-4 h-4" /> View Profile
                                </button>

                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                    <MessageSquare className="w-4 h-4" /> Send Message
                                </button>

                                <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-red-600 hover:bg-red-50"
                                    aria-label="Suspend user">
                                    <UserMinusIcon className="w-4 h-4" /> Suspend User
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full md:w-72 flex-shrink-0   ">
                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <CalendarIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Joined:</div>
                                    <div className="font-medium text-gray-900">2024-01-15</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Last Active:</div>
                                    <div className="font-medium text-gray-900">2 hours ago</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ShoppingBagIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-400">Orders:</div>
                                    <div className="font-medium text-gray-900">45</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* review card end */}
               
            </div>
            {/* end of review cards */}
        </div>
    )
}

export default AllUsers