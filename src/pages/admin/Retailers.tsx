// src/pages/Retailers.tsx
import React, { useMemo, useState, useEffect } from "react";
import { useGetRetailersQuery } from "../../services/api/sokoLinkApi";

export interface Retailer {
    id: string;
    name: string;
    email: string;
}

/** Small reusable modal (Tailwind) */
function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: React.ReactNode; onClose: () => void }) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button aria-label="Close" onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

const Retailers: React.FC = () => {
    const { data, isLoading, isError } = useGetRetailersQuery();
    // local search state
    const [query, setQuery] = useState("");
    // debounced value to avoid filtering on every keystroke
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // profile modal state
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileRetailer, setProfileRetailer] = useState<Retailer | null>(null);

    // debounce effect (300ms)
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
        return () => clearTimeout(t);
    }, [query]);

    // filtered list memoized
    const filtered = useMemo(() => {
        if (!data || !debouncedQuery) return data ?? [];
        return data.filter((r: Retailer) => {
            const q = debouncedQuery;
            return (
                (r.name && r.name.toLowerCase().includes(q)) ||
                (r.email && r.email.toLowerCase().includes(q)) ||
                (r.id && r.id.toLowerCase().includes(q))
            );
        });
    }, [data, debouncedQuery]);

    function openProfile(retailer: Retailer) {
        setProfileRetailer(retailer);
        setProfileOpen(true);
    }
    function closeProfile() {
        setProfileOpen(false);
        setProfileRetailer(null);
    }

    return (
        <div >
            <div className="flex items-start gap-4 flex-col justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Retailers</h1>
                    <p className="text-sm text-gray-500">List of retailers in the system</p>
                </div>

                <div className="w-full overflow-hidden">
                    <label className="relative block">
                        <span className="sr-only">Search retailers</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name, email or id..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none  bg-white  "
                        />
                    </label>
                </div>
            </div>

            <div>
                {isLoading && (
                    <div className="py-6 text-center text-gray-600">Loading retailers…</div>
                )}

                {isError && (
                    <div className="py-6 text-center text-red-600">Failed to load retailers.</div>
                )}

                {!isLoading && !isError && (filtered.length === 0) && (
                    <div className="py-6 text-center text-gray-600">
                        {debouncedQuery ? "No retailers match your search." : "No retailers found."}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                    {(filtered || []).map((retailer: Retailer) => (
                        <div key={retailer.id} className="bg-white p-4 rounded-lg shadow
                        ">
                            <div className="flex justify-between flex-col gap-1 items-start">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{retailer.name}</h2>
                                    <p className="text-sm text-gray-500">{retailer.email}</p>
                                </div>
                                <div className="text-xs text-gray-400">ID: {retailer.id}</div>
                            </div>

                            <div className="mt-3 flex gap-2">
                                <button
                                    className="px-3 py-1.5 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => openProfile(retailer)}
                                >
                                    View
                                </button>
                                {/* Message button removed as requested */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Profile modal */}
            <Modal open={profileOpen} title="Retailer profile" onClose={closeProfile}>
                {profileRetailer ? (
                    <div className="text-sm text-gray-700">
                        <p><strong>Name:</strong> {profileRetailer.name}</p>
                        <p><strong>Email:</strong> {profileRetailer.email}</p>
                        <p><strong>ID:</strong> {profileRetailer.id}</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={closeProfile} className="px-4 py-2 rounded border cursor-pointer">Close</button>
                        </div>
                    </div>
                ) : (
                    <div className="py-6 text-center text-gray-500">No data</div>
                )}
            </Modal>
        </div>
    );
};

export default Retailers;
