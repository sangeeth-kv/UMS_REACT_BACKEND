const BroadcastEmailPage = () => {
  return (
    <div className="max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Send Email to All Users
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border rounded dark:bg-gray-700"
        />

        <textarea
          rows="5"
          placeholder="Email message..."
          className="w-full p-2 border rounded dark:bg-gray-700"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default BroadcastEmailPage;
