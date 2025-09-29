// src/pages/retailer/Dashboard.tsx
import React from 'react';
import { TrendingUp, ShoppingCart, Package, Users, Bell, ArrowRight, Calendar } from 'lucide-react';

const Dashboard = () => {

    const userInfo = JSON.parse(localStorage.getItem('retailerAuthData') || '{}');
    const userName = userInfo.user.name;
    console.log(userInfo);
    // Mock data
    const salesData = [
        { month: 'Jan', orders: 30 },
        { month: 'Feb', orders: 23 },
        { month: 'Mar', orders: 18 },
        { month: 'Apr', orders: 15 }
    ];

    const recentOrders = [
        { id: 'ORD-B001', supplier: 'ABC Wholesalers', date: '2024-09-19', items: 25, amount: 12450 },
        { id: 'ORD-B002', supplier: 'Global Supply Co.', date: '2024-09-20', items: 15, amount: 8200 },
        { id: 'ORD-B003', supplier: 'Metro Distributors', date: '2024-09-22', items: 23, amount: 5300 }
    ];

    const categories = [
        { name: 'Electronics', percentage: 25 },
        { name: 'Fashion', percentage: 25 },
        { name: 'Home & Garden', percentage: 25 },
        { name: 'Food & Beverages', percentage: 24 }
    ];

    const updates = [
        {
            title: 'New bulk discount available on electronics up to 50% off',
            time: '1 day ago'
        },
        {
            title: 'DPO certification required for orders above RWF 100,000',
            time: '2 days ago'
        },
        {
            title: 'Extended payment terms now available for verified retailers',
            time: '1 week ago'
        }
    ];

    const stats = [
        { icon: ShoppingCart, label: 'Total Orders', value: '68', change: '+12%' },
        { icon: Package, label: 'Products', value: '156', change: '+5%' },
        { icon: Users, label: 'Suppliers', value: '24', change: '+8%' },
        { icon: TrendingUp, label: 'Revenue', value: 'RWF 256K', change: '+18%' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, { userName}'s Store!</h1>
                <p className="text-gray-600 text-lg">Manage your retail business and explore wholesale opportunities</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Stats and Sales Chart */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                        <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                                    </div>
                                    <div className="p-3 bg-teal-50 rounded-lg">
                                        <stat.icon className="w-6 h-6 text-teal-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sales Trends */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Monthly Sales Trends</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>Last 30 days</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-40">
                            {salesData.map((month, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-12 bg-gradient-to-t from-teal-500 to-teal-300 rounded-t-lg transition-all hover:from-teal-600 hover:to-teal-400"
                                        style={{ height: `${(month.orders / 30) * 100}%` }}
                                    ></div>
                                    <div className="text-center mt-3">
                                        <p className="text-sm font-semibold text-gray-900">{month.orders}</p>
                                        <p className="text-xs text-gray-500 mt-1">{month.month}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                            <button className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium">
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.map((order, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.id}</p>
                                        <p className="text-sm text-gray-600 mt-1">{order.supplier}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                        <p className="text-sm font-medium text-gray-900 mt-1">
                                            {order.items} items • RWF {order.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Categories and Updates */}
                <div className="space-y-6">
                    {/* Top Categories */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Categories</h2>
                        <div className="space-y-4">
                            {categories.map((category, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">{category.name}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full"
                                                style={{ width: `${category.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 w-8">{category.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Business Updates */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Business Updates</h2>
                            <Bell className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="space-y-4">
                            {updates.map((update, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-sm text-gray-900 font-medium leading-relaxed">
                                        {update.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">{update.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Suppliers */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Active Suppliers</h2>
                            <span className="text-2xl font-bold text-teal-600">24</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Suppliers you've worked with recently</p>
                        <button className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                            Manage Suppliers
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;