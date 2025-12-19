export default function NotesTab() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Notes</h2>
        <p className="text-sm text-gray-500">
          Call notes and additional information
        </p>
      </div>

      <div className="border rounded-lg p-4 text-sm">
        Patient stabilized during transport. ECG showed ST elevation.
        Administered aspirin and nitroglycerin per protocol.
      </div>

      <div>
        <h4 className="font-medium mb-2">Add Note</h4>
        <textarea
          className="w-full border rounded-lg p-3 text-sm"
          rows={4}
          placeholder="Enter additional notes here..."
        />
        <button className="mt-3 bg-black text-white px-4 py-2 rounded-md text-sm">
          Add Note
        </button>
      </div>
    </div>
  );
}
