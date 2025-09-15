function AllUsers() {
    return (
        <div>  <h1 className="text-3xl font-bold  text-gray-800">
            User Management
        </h1>
            <p className=" text-gray-600">
                Manage users, verify accounts, and monitor platform activity
            </p>
            <div className="grid grid-cols-4 gap-4 mt-6">
                {/* <!-- Total Users --> */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center border  border-[#008994]">
                    <span className="text-2xl font-bold text-gray-800">2,847</span>
                    <span className="text-gray-500">Total Users</span>
                </div>

                {/* <!-- Suspended Users --> */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#EB2A2A]">12</span>
                    <span className="text-gray-500">Suspended Users</span>
                </div>

                {/* <!-- Pending Verification --> */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#F4B400]">34</span>
                    <span className="text-gray-500">Pending Verification</span>
                </div>

                {/* <!-- Active Users --> */}
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#08DA24]">2647</span>
                    <span className="text-gray-500">Active Users</span>
                </div>
            </div>
            {/* Filter row */}
            <div className="flex gap-3 items-center mt-6 bg-white p-3 rounded-md shadow">
                <input type="text" placeholder="Search by name, email or business..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008994]" />

                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008994]">
                    <option>User Type</option>
                </select>

                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008994]">
                    <option>Status</option>
                </select>

                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008994]">
                    <option>Verification</option>
                </select>
            </div>
            {/*  */}
            <div className="bg-white p-6 mt-6 rounded-lg shadow flex flex-col gap-3">
                {/* <!-- Header --> */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">John Smith</h2>
                        <div className="flex gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-[#E6F4F5] text-[#008994] text-xs rounded">Wholesaler</span>
                            <span className="px-2 py-0.5 bg-[#E6F9E9] text-[#08DA24] text-xs rounded">active</span>
                            <span className="px-2 py-0.5 bg-[#E6F9E9] text-[#008994] text-xs rounded">verified</span>
                        </div>
                    </div>
                    <span className="text-gray-500 text-sm">ID: USR-001</span>
                </div>

                {/* <!-- Info --> */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <p><strong>Email:</strong> john@techsolutions.com</p>
                        <p><strong>Phone:</strong> +25472345678</p>
                        <p><strong>Business:</strong> Tech Solutions Ltd</p>
                        <p className="text-[#008994] font-semibold">Rwf 230,000</p>
                    </div>
                    <div className="text-right">
                        <p>Joined: <span className="text-gray-600">2024-01-15</span></p>
                        <p>Last Active: <span className="font-medium">2 hours ago</span></p>
                        <p>Orders: <span className="font-medium">45</span></p>
                    </div>
                </div>

                {/* <!-- Actions --> */}
                <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">View Profile</button>
                    <button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">Send Message</button>
                    <button className="px-4 py-2 text-sm rounded-md bg-red-100 text-[#EB2A2A] hover:bg-red-200">Suspend User</button>
                </div>
            </div>



        </div>
    )
}

export default AllUsers