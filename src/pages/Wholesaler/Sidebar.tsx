function Sidebar() {
const links = [
{ key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
{ key: 'products', label: 'My Products', icon: 'products' },
{ key: 'add', label: 'Add Product', icon: 'products' },
{ key: 'orders', label: 'Orders', icon: 'orders' },
{ key: 'track', label: 'Track Orders', icon: 'orders' },
{ key: 'analytics', label: 'Analytics', icon: 'dashboard' },
{ key: 'verification', label: 'Verification', icon: 'dashboard' },
{ key: 'profile', label: 'Profile', icon: 'dashboard' },
{ key: 'notifications', label: 'Notifications', icon: 'bell' },
];


return (
<aside className="w-72 bg-white border-r h-screen sticky top-0 px-6 py-8">
<div className="flex items-center gap-3 mb-8">
<div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold">S</div>
<div>
<div className="font-semibold">SokoLink</div>
<div className="text-sm text-slate-400">Wholesale</div>
</div>
</div>


<nav className="space-y-2">
{links.map(link => (
<button key={link.key} className={`w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-slate-50 ${link.key === 'dashboard' ? 'bg-slate-50' : ''}`}>
<Icon name={link.icon} className="w-5 h-5 text-slate-600" />
<span className="text-slate-700">{link.label}</span>
</button>
))}
</nav>
</aside>
);
}