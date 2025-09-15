function Topbar() {
return (
<header className="flex items-center justify-between px-6 py-4">
<div>
<h1 className="text-2xl font-semibold">Welcome back, TechWorld Distributors!</h1>
<p className="text-sm text-slate-500">Manage your wholesale business and track your sales performance</p>
</div>


<div className="flex items-center gap-4">
<div className="relative">
<button className="p-2 rounded-full hover:bg-slate-100"><Icon name="bell" className="w-5 h-5"/></button>
<span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full px-1">3</span>
</div>
<div className="flex items-center gap-2">
<img src="https://avatars.dicebear.com/api/initials/TW.svg" alt="avatar" className="w-10 h-10 rounded-full" />
</div>
</div>
</header>
);
}