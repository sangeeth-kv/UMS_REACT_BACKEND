const Table = ({ data, type }) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 dark:text-gray-400 border-b">
          <th className="py-2">Fullname</th>
          <th className="py-2">Email</th>
          <th className="py-2">Reason</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={3} className="py-4 text-center">
              No data found
            </td>
          </tr>
        )}

        {data.map((user) => (
          <tr key={user._id} className="border-b last:border-none">
            <td className="py-2 text-gray-700 dark:text-gray-300">
              {user.fullname}
            </td>

            <td className="py-2 text-gray-700 dark:text-gray-300">
              {user.email}
            </td>

            <td className="py-2 text-gray-700 dark:text-gray-300">
              {type === "blocked"
                ? user.isBlocked?.reason || "No reason found"
                : user.isDeleted?.reason || "No reason found"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
