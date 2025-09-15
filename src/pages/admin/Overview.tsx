import { BoxIcon, CheckCircle, CircleXIcon, ClipboardMinus, DollarSignIcon, EyeIcon, MessageSquareIcon, ShoppingCartIcon, Users2Icon } from "lucide-react";
import { Link } from "react-router-dom";

function Overview() {
  return (
      <div>
          <h1 className="text-3xl font-bold  text-gray-800">
              Welcome back Admin!
          </h1>
          <p className=" text-gray-600">
              Dashboard Overview
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-[32px] items-center justify-center" >
              {/* Stat card start */}
              <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between items-center h-[166px]">
                  <div className="flex flex-col gap-[18px]">
                      <h3 className="text-1xl  text-gray-700">Total Users</h3>
                      <div className="flex gap-2 items-end font-bold">
                          <p className="text-2xl text-gray-800">$47,382</p>
                          <p className="text-green-600">+23%</p>
                      </div>
                  </div>
                  <div className="p-4 shadow-[2px_2px_10px_#CECECEFF] rounded-full">
                      <Users2Icon color="#3C83F6" />
                  </div>
              </div>
              {/* Stat card end */}
              {/* Stat card start */}
              <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between items-center h-[166px]">
                  <div className="flex flex-col gap-[18px]">
                      <h3 className="text-1xl  text-gray-700">Total Products</h3>
                      <div className="flex gap-2 items-end font-bold">
                          <p className="text-2xl text-gray-800">47,382</p>
                          <p className="text-green-600">+23%</p>
                      </div>
                  </div>
                  <div className="p-4 shadow-[2px_2px_10px_#CECECEFF] rounded-full">
                      <BoxIcon color="#008994" />
                  </div>
              </div>
              {/* Stat card end */}
              {/* Stat card start */}
              <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between items-center h-[166px]">
                  <div className="flex flex-col gap-[18px]">
                      <h3 className="text-1xl  text-gray-700">Total Orders</h3>
                      <div className="flex gap-2 items-end font-bold">
                          <p className="text-2xl text-gray-800">47,382</p>
                          <p className="text-green-600">+23%</p>
                      </div>
                  </div>
                  <div className="p-4 shadow-[2px_2px_10px_#CECECEFF] rounded-full">
                      <ShoppingCartIcon color="#16A249" />
                  </div>
              </div>
              {/* Stat card end */}
              {/* Stat card start */}
              <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between items-center h-[166px]">
                  <div className="flex flex-col gap-[18px]">
                      <h3 className="text-1xl  text-gray-700">Monthly Revenue</h3>
                      <div className="flex gap-2 items-end font-bold">
                          <p className="text-2xl text-gray-800">$47,382</p>
                          <p className="text-green-600">+23%</p>
                      </div>
                  </div>
                  <div className="p-4 shadow-[2px_2px_10px_#CECECEFF] rounded-full">
                      <DollarSignIcon color="#B2257E" />
                  </div>
              </div>
              {/* Stat card end */}
              {/* Stat card start */}
              <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between items-center h-[166px]">
                  <div className="flex flex-col gap-[18px]">
                      <h3 className="text-1xl  text-gray-700">Pending Reviews</h3>
                      <div className="flex gap-2 items-end font-bold">
                          <p className="text-2xl text-gray-800">24</p>
                      </div>
                  </div>
                  <div className="p-4 shadow-[2px_2px_10px_#CECECEFF] rounded-full">
                      <ClipboardMinus color="#FBBD23" />
                  </div>
              </div>
              {/* Stat card end */}
              {/* Stat card start */}
              <div className="p-[24px] bg-white shadow rounded-[24px] flex justify-between items-center h-[166px]">
                  <div className="flex flex-col gap-[18px]">
                      <h3 className="text-1xl  text-gray-700">Active Support Tickets</h3>
                      <div className="flex gap-2 items-end font-bold">
                          <p className="text-2xl text-gray-800">7</p>
                      </div>
                  </div>
                  <div className="p-4 shadow-[2px_2px_10px_#CECECEFF] rounded-full">
                      <MessageSquareIcon color="#EF4343" />
                  </div>
              </div>
              {/* Stat card end */}
          </div>
          {/* End of stats cards row */}
          <div className=" mt-[32px] grid grid-cols-1 md:grid-cols-2 gap-[32px]">
              {/* Verification */}
              <div className="bg-white shadow rounded-[20px] p-[24px] ">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">Verification Queue</h3>
                      <Link to="" className="text-sm text-gray-500">View All</Link>
                  </div>
                  {/* Verification queue list*/}
                  <div className="flex flex-col gap-2">
                      {/* Verification card */}
                      <div className="flex flex-col gap-2 bg-[#F5F9F5] p-4 rounded-[10px]">
                          <div className="flex justify-between items-center ">
                              <h4 className="text-sm">Metro Electronics</h4>
                              {/* status */}
                              <div className="flex gap-2 items-center">
                                  <span className="text-xs border border-gray-300 text-gray-600 px-4 py-1 rounded-full">Wholesaler</span>
                                  <span className="text-xs bg-red-600 text-white px-4 py-1 rounded-full">Pending</span>
                              </div>
                              {/* Icons */}
                              <div className="flex gap-2 items-center">
                                  <div className="p-1.5 flex items-center justify-between rounded cursor-pointer"><EyeIcon size={16} /></div>
                                  <div className="p-1.5 flex items-center justify-between rounded  border border-gray-300 cursor-pointer"><CheckCircle size={16} /></div>
                                  <div className="p-1.5 flex items-center justify-between rounded bg-red-500 text-white cursor-pointer"><CircleXIcon size={16} /></div>
                              </div>
                          </div>
                          {/* Submited at */}
                          <p className="text-gray-400">Submited at {new Date().toUTCString()}</p>

                      </div>
                      {/* End of verification card */}
                      {/* Verification card */}
                      <div className="flex flex-col gap-2 bg-[#F5F9F5] p-4 rounded-[10px]">
                          <div className="flex justify-between items-center ">
                              <h4 className="text-sm">Global Supply Co</h4>
                              {/* status */}
                              <div className="flex gap-2 items-center">
                                  <span className="text-xs border border-gray-300 text-gray-600 px-4 py-1 rounded-full">Wholesaler</span>
                                  <span className="text-xs bg-red-400 text-white px-4 py-1 rounded-full">Reviewing</span>
                              </div>
                              {/* Icons */}
                              <div className="flex gap-2 items-center">
                                  <div className="p-1.5 flex items-center justify-between rounded cursor-pointer"><EyeIcon size={16} /></div>
                                  <div className="p-1.5 flex items-center justify-between rounded  border border-gray-300 cursor-pointer"><CheckCircle size={16} /></div>
                                  <div className="p-1.5 flex items-center justify-between rounded bg-red-500 text-white cursor-pointer"><CircleXIcon size={16} /></div>
                              </div>
                          </div>
                          {/* Submited at */}
                          <p className="text-gray-400">Submited at {new Date().toUTCString()}</p>

                      </div>
                      {/* End of verification card */}
                      {/* Verification card */}
                      <div className="flex flex-col gap-2 bg-[#F5F9F5] p-4 rounded-[10px]">
                          <div className="flex justify-between items-center ">
                              <h4 className="text-sm">Global Supply Co</h4>
                              {/* status */}
                              <div className="flex gap-2 items-center">
                                  <span className="text-xs border border-gray-300 text-gray-600 px-4 py-1 rounded-full">Wholesaler</span>
                                  <span className="text-xs bg-red-400 text-white px-4 py-1 rounded-full">Reviewing</span>
                              </div>
                              {/* Icons */}
                              <div className="flex gap-2 items-center">
                                  <div className="p-1.5 flex items-center justify-between rounded cursor-pointer"><EyeIcon size={16} /></div>
                                  <div className="p-1.5 flex items-center justify-between rounded  border border-gray-300 cursor-pointer"><CheckCircle size={16} /></div>
                                  <div className="p-1.5 flex items-center justify-between rounded bg-red-500 text-white cursor-pointer"><CircleXIcon size={16} /></div>
                              </div>
                          </div>
                          {/* Submited at */}
                          <p className="text-gray-400">Submited at {new Date().toUTCString()}</p>

                      </div>
                      {/* End of verification card */}


                  </div>

              </div>
              {/* Products */}
              <div className="bg-white shadow rounded-[20px] p-[24px]">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">Flagged Products</h3>
                      <Link to="" className="text-sm text-gray-500">View All</Link>
                  </div>
                  {/* Flagged Products row */}
                  <div className="flex flex-col gap-2">
                      {/* Flagged product card start*/}
                      <div className="flex flex-col gap-2 bg-[#F5F9F5] p-4 rounded-[10px]">
                          <div className="flex justify-between items-start ">
                              <div className="w-3/4">
                                  <h4 className="text-sm mb-2">A MacBook Laptop</h4>
                                  <div className=" mb-2">
                                      <p className="text-gray-400">Business: Techworld</p>
                                      <p className="text-gray-400">Reason: Suspecious pricing. {new Date().toUTCString()}</p>

                                  </div>
                                  <div className="flex gap-2 items-center">
                                      <button className="cursor-pointer text-xs border border-gray-500 bg-white text-gray-600 px-4 py-1 rounded-[8px]">Review</button>
                                      <button className="cursor-pointer text-xs bg-red-600 text-white px-4 py-1 rounded-[8px]">Remove</button>
                                  </div>
                              </div>
                              <span className="cursor-pointer text-xs bg-red-600 text-white px-4 py-1 rounded-full">Flagged</span>

                          </div>

                      </div>
                      {/* Flagged product card  end*/}
                      {/* Flagged product card start*/}
                      <div className="flex flex-col gap-2 bg-[#F5F9F5] p-4 rounded-[10px]">
                          <div className="flex justify-between items-start ">
                              <div className="w-3/4 ">
                                  <h4 className="text-sm mb-2">iPhone 15 Pro Max</h4>
                                  <div className="mb-2">
                                      <p className="text-gray-400">Business: Techworld</p>
                                      <p className="text-gray-400">Reason: Suspecious pricing. {new Date().toUTCString()}</p>

                                  </div>
                                  <div className="flex gap-2 items-center">
                                      <button className="cursor-pointer text-xs border border-gray-300 text-gray-600 px-4 py-1 rounded-[8px]">Review</button>
                                      <button className="cursor-pointer text-xs bg-red-600 text-white px-4 py-1 rounded-[8px]">Remove</button>
                                  </div>
                              </div>

                              <span className="cursor-pointer text-xs bg-red-600 text-white px-4 py-1 rounded-full">Flagged</span>


                          </div>

                      </div>
                      {/* Flagged product card  end*/}
                      {/* Recent activities */}

                  </div>

              </div>
          </div>
          <div className="mt-[32px] bg-white shadow rounded-[20px] p-[24px]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent activities</h3>


              <div className=" mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-start gap-3 p-[20px] bg-[#F4F2F1] rounded-[10px] border border-[#E0E0E0]">
                      {/* Left dot */}
                      <span className="w-[12px] h-[12px] bg-[#008A94] rounded-full mt-1"></span>

                      {/* Right content */}
                      <div className="flex flex-col gap-1">
                          <h4 className="text-[18px] font-bold text-gray-800">New User registration</h4>
                          <p className="text-sm text-gray-400">User: sarah@retailstore.com</p>
                          <p className="text-sm text-gray-400">5 minutes ago</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-3 p-[20px] bg-[#F4F2F1] rounded-[10px] border border-[#E0E0E0]">
                      {/* Left dot */}
                      <span className="w-[12px] h-[12px] bg-[#50DDE7] rounded-full mt-1"></span>

                      {/* Right content */}
                      <div className="flex flex-col gap-1">
                          <h4 className="text-[18px] font-bold text-gray-800">New User registration</h4>
                          <p className="text-sm text-gray-400">User: sarah@retailstore.com</p>
                          <p className="text-sm text-gray-400">5 minutes ago</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-3 p-[20px] bg-[#F4F2F1] rounded-[10px] border border-[#E0E0E0]">
                      {/* Left dot */}
                      <span className="w-[12px] h-[12px] bg-[#EEBD2B] rounded-full mt-1"></span>

                      {/* Right content */}
                      <div className="flex flex-col gap-1">
                          <h4 className="text-[18px] font-bold text-gray-800">New User registration</h4>
                          <p className="text-sm text-gray-400">User: sarah@retailstore.com</p>
                          <p className="text-sm text-gray-400">5 minutes ago</p>
                      </div>
                  </div>


              </div>
          </div>
      </div>
  );
}

export default Overview;
