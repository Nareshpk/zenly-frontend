import { X } from "lucide-react";

export const Modal = ({ open, onClose, children }: any) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 w-full"
            onClick={onClose} // click outside = close
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 animate-scaleIn relative"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                    <X className="w-5 h-5" />
                </button>

                {children}
            </div>

            {/* Animation */}
            <style>{`
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
        </div>
    );
};
