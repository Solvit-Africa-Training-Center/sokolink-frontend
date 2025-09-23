// src/components/AllUsers.tsx
import React, { useMemo, useState, useEffect } from "react";
import { useApproveUserMutation, useGetAdminWholesalersQuery } from "../../services/api/sokoLinkApi";

interface Wholesaler {
    id: string;
    name: string;
    email: string;
    status: "active" | "suspended" | string;
    businessLicenceDocument?: string | null;
    taxCertificate?: string | null;
}

/** Reusable modal (same as before) */
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
            <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6 z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button aria-label="Close" onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

/** Profile modal (unchanged) */
function ProfileModal({ open, wholesaler, onClose }: { open: boolean; wholesaler: Wholesaler | null; onClose: () => void }) {
    if (!open || !wholesaler) return null;

    const renderDocument = (url?: string | null, label?: string) => {
        if (!url) return <div className="text-sm text-gray-500">No {label} uploaded</div>;
        const lower = url.toLowerCase();
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png") || lower.endsWith(".gif") || lower.endsWith(".webp")) {
            return (
                <div className="mt-2">
                    <img src={url} alt={label} className="max-h-60 w-full object-contain border rounded" />
                    <div className="mt-1 text-xs"><a href={url} target="_blank" rel="noreferrer" className="underline">Open image</a></div>
                </div>
            );
        }
        if (lower.endsWith(".pdf")) {
            return (
                <div className="mt-2">
                    <iframe src={url} title={label} className="w-full h-72 border rounded" />
                    <div className="mt-1 text-xs"><a href={url} target="_blank" rel="noreferrer" className="underline">Open PDF</a></div>
                </div>
            );
        }
        return (
            <div className="mt-2">
                <div className="text-sm"><a href={url} target="_blank" rel="noreferrer" className="underline">Open document</a></div>
                <div className="mt-2">
                    <iframe src={url} title={label} className="w-full h-48 border rounded" />
                </div>
            </div>
        );
    };

    return (
        <Modal open={open} title="Wholesaler profile" onClose={onClose}>
            <div className="text-sm text-gray-700">
                <p><strong>Name:</strong> {wholesaler.name}</p>
                <p><strong>Email:</strong> {wholesaler.email}</p>
                <p><strong>Status:</strong> <span className="font-medium capitalize">{wholesaler.status}</span></p>

                <div className="mt-4">
                    <h4 className="font-medium">Business License</h4>
                    {renderDocument(wholesaler.businessLicenceDocument ?? null, "business license")}
                </div>

                <div className="mt-4">
                    <h4 className="font-medium">Tax Certificate</h4>
                    {renderDocument(wholesaler.taxCertificate ?? null, "tax certificate")}
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={onClose} className="px-4 py-2 rounded border">Close</button>
            </div>
        </Modal>
    );
}

/** Helper: determines verification state */
function isVerified(w: Wholesaler) {
    return Boolean(w.businessLicenceDocument || w.taxCertificate);
}

export default function AllUsers() {
    const { data: wholesalerData, isLoading, isError } = useGetAdminWholesalersQuery();
    const [approveUser, { isLoading: isApproving }] = useApproveUserMutation();

    // action modal (approve/reject)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUserId, setModalUserId] = useState<string | null>(null);
    const [modalUserName, setModalUserName] = useState<string | null>(null);
    const [modalAction, setModalAction] = useState<"approve" | "reject">("approve");
    const [reason, setReason] = useState<string>("");

    // validation for reason when rejecting
    const [validationError, setValidationError] = useState<string | null>(null);

    // profile modal
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileWholesaler, setProfileWholesaler] = useState<Wholesaler | null>(null);

    // UI-level loading for a specific user's action
    const [approvingUserId, setApprovingUserId] = useState<string | null>(null);

    // --- FILTER STATE ---
    const [query, setQuery] = useState(""); // search text
    const [statusFilter, setStatusFilter] = useState<string>("all"); // 'all' or status value
    const [verificationFilter, setVerificationFilter] = useState<string>("all"); // 'all' | 'verified' | 'not_verified'

    // Derived sets from the data to populate filter options (and hide ones that don't match)
    const statusOptions = useMemo(() => {
        if (!wholesalerData) return [];
        const setStatus = new Set<string>();
        wholesalerData.forEach((w) => setStatus.add(w.status || "unknown"));
        return Array.from(setStatus);
    }, [wholesalerData]);

    // Filtered list (applies search + status + verification)
    const filtered = useMemo(() => {
        if (!wholesalerData) return [];
        const q = query.trim().toLowerCase();

        return wholesalerData.filter((w) => {
            // remove entries that are missing (defensive)
            if (!w) return false;

            // SEARCH: name, email, id
            if (q) {
                const matches =
                    (w.name && w.name.toLowerCase().includes(q)) ||
                    (w.email && w.email.toLowerCase().includes(q)) ||
                    (w.id && w.id.toLowerCase().includes(q));
                if (!matches) return false;
            }

            // STATUS: 'all' or exact match
            if (statusFilter !== "all" && w.status !== statusFilter) return false;

            // VERIFICATION: all | verified | not_verified
            const verified = isVerified(w);
            if (verificationFilter === "verified" && !verified) return false;
            if (verificationFilter === "not_verified" && verified) return false;

            return true;
        });
    }, [wholesalerData, query, statusFilter, verificationFilter]);

    // --- UI helpers ---
    function openModal(id: string, action: "approve" | "reject", name?: string) {
        setModalUserId(id);
        setModalAction(action);
        setModalUserName(name ?? null);
        setReason("");
        setValidationError(null);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setModalUserId(null);
        setModalUserName(null);
        setReason("");
        setValidationError(null);
    }

    function openProfile(wholesaler: Wholesaler) {
        setProfileWholesaler(wholesaler);
        setProfileOpen(true);
    }
    function closeProfile() {
        setProfileOpen(false);
        setProfileWholesaler(null);
    }

    // Submit from modal: require reason when rejecting
    const handleConfirmAction = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!modalUserId) return;

        if (modalAction === "reject" && (!reason || reason.trim().length < 3)) {
            setValidationError("Please provide a reason (at least 3 characters) for rejecting the wholesaler.");
            return;
        }

        setApprovingUserId(modalUserId);
        try {
            await approveUser({ id: modalUserId, action: modalAction, reason }).unwrap();
            alert(`Successfully sent "${modalAction}" for ${modalUserName ?? modalUserId}.`);
            closeModal();
        } catch (err: any) {
            console.error("Action failed:", err);
            if (err?.status === 404) {
                alert("Not found (404). Please verify the wholesaler id.");
            } else {
                alert("Failed to perform action. See console for details.");
            }
        } finally {
            setApprovingUserId(null);
        }
    };

    // Decide whether to show status select: hide if there is only one status in data
    const showStatusSelect = statusOptions.length > 1;

    // Decide whether to show verification select: hide if all are verified or none verified
    const verificationCounts = useMemo(() => {
        if (!wholesalerData) return { verified: 0, notVerified: 0 };
        let v = 0, nv = 0;
        wholesalerData.forEach((w) => (isVerified(w) ? v++ : nv++));
        return { verified: v, notVerified: nv };
    }, [wholesalerData]);

    const showVerificationSelect = verificationCounts.verified > 0 && verificationCounts.notVerified > 0;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Wholesaler management</h1>
            <p className="text-gray-600">Manage users, verify accounts, and monitor platform activity</p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center border border-[#008994]">
                    <span className="text-2xl font-bold text-gray-800">{wholesalerData?.length ?? 0}</span>
                    <span className="text-gray-500">Total Users</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#EB2A2A]">{wholesalerData?.filter(w => w.status === "suspended").length ?? 0}</span>
                    <span className="text-gray-500">Suspended Users</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#F4B400]">{wholesalerData?.filter(w => !isVerified(w)).length ?? 0}</span>
                    <span className="text-gray-500">Pending Verification</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#08DA24]">{wholesalerData?.filter(w => w.status === "active").length ?? 0}</span>
                    <span className="text-gray-500">Active Users</span>
                </div>
            </div>

            {/* Filter row */}
            <div className="flex gap-3 items-center mt-6 bg-white p-3 rounded-md shadow">
                {/* SEARCH */}
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search by name, email or id..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008994]"
                />

                {/* STATUS SELECT - shown only if there are multiple statuses in response */}
                {showStatusSelect && (
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008994]"
                    >
                        <option value="all">All statuses</option>
                        {statusOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                )}

                {/* VERIFICATION SELECT - shown only if there are both verified and not verified entries */}
                {showVerificationSelect && (
                    <select
                        value={verificationFilter}
                        onChange={(e) => setVerificationFilter(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008994]"
                    >
                        <option value="all">All</option>
                        <option value="verified">Verified</option>
                        <option value="not_verified">Not verified</option>
                    </select>
                )}

                {/* If both selects are hidden, show a small info */}
                {!showStatusSelect && !showVerificationSelect && (
                    <div className="text-sm text-gray-500">No additional filters available</div>
                )}
            </div>

            {/* Wholesalers List */}
            {isLoading && <div className="mt-6">Loading users...</div>}
            {isError && <div className="mt-6 text-red-600">Error loading users</div>}

            {filtered.length === 0 && !isLoading && (
                <div className="mt-6 text-gray-600">No wholesalers match your filters.</div>
            )}

            {filtered.map((wholesaler: Wholesaler) => {
                const isBusy = approvingUserId === wholesaler.id || isApproving;
                const defaultAction: "approve" | "reject" = wholesaler.status === "active" ? "reject" : "approve";
                const buttonLabel = wholesaler.status === "active" ? "Reject / Suspend" : "Approve";

                return (
                    <div key={wholesaler.id} className="bg-white p-6 mt-6 rounded-lg shadow flex flex-col gap-3">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{wholesaler.name}</h2>
                                <div className="flex gap-2 mt-1">
                                    <span className="px-2 py-0.5 bg-[#E6F4F5] text-[#008994] text-xs rounded">Wholesaler</span>
                                    <span className={`px-2 py-0.5 text-xs rounded ${wholesaler.status === "active" ? "bg-[#E6F9E9] text-[#08DA24]" : "bg-[#FDE7E9] text-[#EB2A2A]"}`}>
                                        {wholesaler.status}
                                    </span>
                                    <span className="px-2 py-0.5 bg-[#E6F9E9] text-[#008994] text-xs rounded">verified</span>
                                </div>
                            </div>
                            <span className="text-gray-500 text-sm">ID: {wholesaler.id}</span>
                        </div>

                        {/* Info */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <p><strong>Email:</strong> {wholesaler.email}</p>
                                <p><strong>Business License:</strong> {wholesaler.businessLicenceDocument ? "Uploaded" : "Not Uploaded"}</p>
                                <p><strong>Tax Certificate:</strong> {wholesaler.taxCertificate ? "Uploaded" : "Not Uploaded"}</p>
                            </div>
                            <div className="text-right">
                                <p>Status: <span className="font-medium capitalize">{wholesaler.status}</span></p>
                            </div>
                        </div>

                        {/* Actions - added explicit Reject button */}
                        <div className="flex gap-3 mt-4">
                            <button
                                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
                                onClick={() => openProfile(wholesaler)}
                            >
                                View Profile
                            </button>

                            {/* <button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer">Send Message</button> */}

                            <button
                                className="px-4 py-2 text-sm rounded-md bg-red-100 text-[#EB2A2A] hover:bg-red-200 cursor-pointer disabled:opacity-50"
                                disabled={isBusy}
                                onClick={() => openModal(wholesaler.id, defaultAction, wholesaler.name)}
                            >
                                {isBusy ? "Processing..." : buttonLabel}
                            </button>

                            <button
                                className="px-4 py-2 text-sm rounded-md bg-[#EB5757] text-white hover:bg-[#d64545] cursor-pointer disabled:opacity-50"
                                disabled={isBusy}
                                onClick={() => openModal(wholesaler.id, "reject", wholesaler.name)}
                                title="Reject wholesaler (requires reason)"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Confirmation modal (approve/reject) */}
            <Modal
                open={modalOpen}
                title={`${modalAction === "approve" ? "Approve" : "Reject / Suspend"} wholesaler`}
                onClose={closeModal}
            >
                <form onSubmit={handleConfirmAction}>
                    <p className="mb-2">Wholesaler: <strong>{modalUserName ?? modalUserId}</strong></p>

                    <label className="block text-sm mb-2">
                        Reason {modalAction === "reject" ? <span className="text-red-600">*</span> : <span className="text-gray-400">(optional)</span>}
                        <textarea
                            value={reason}
                            onChange={(e) => { setReason(e.target.value); setValidationError(null); }}
                            className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            placeholder={modalAction === "approve" ? "Reason for approval (optional)" : "Reason for rejection/suspension (required)"}
                            rows={3}
                        />
                    </label>

                    {validationError && <div className="text-sm text-red-600 mb-2">{validationError}</div>}

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Cancel</button>
                        <button
                            type="submit"
                            disabled={approvingUserId === modalUserId || isApproving}
                            className="px-4 py-2 rounded bg-[#008994] text-white disabled:opacity-60"
                        >
                            {approvingUserId === modalUserId || isApproving ? "Processing..." : modalAction === "approve" ? "Confirm Approve" : "Confirm Reject"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Profile modal */}
            <ProfileModal open={profileOpen} wholesaler={profileWholesaler} onClose={closeProfile} />
        </div>
    );
}
