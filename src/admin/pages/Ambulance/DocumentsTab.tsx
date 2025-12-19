export default function DocumentsTab() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Documents</h2>
        <p className="text-sm text-gray-500">
          Reports and documents related to this call
        </p>
      </div>

      <div className="space-y-3">
        {[
          ["Incident Report", "PDF • 2.3 MB • Added on 2023-04-22"],
          ["Patient Care Record", "PDF • 1.8 MB • Added on 2023-04-22"],
          ["ECG Results", "JPG • 0.5 MB • Added on 2023-04-22"],
        ].map(([title, meta]) => (
          <div
            key={title}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-gray-500">{meta}</p>
            </div>
            <button className="px-3 py-1.5 border rounded-md text-sm">
              View
            </button>
          </div>
        ))}
      </div>

      <button className="w-full border rounded-md py-2 text-sm">
        Upload Document
      </button>
    </div>
  );
}
