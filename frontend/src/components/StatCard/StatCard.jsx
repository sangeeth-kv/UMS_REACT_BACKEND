const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
    <h2 className="text-sm text-gray-500 dark:text-gray-400">{title}</h2>
    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
      {value}
    </p>
  </div>
);

export default StatCard;
