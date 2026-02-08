const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
      {title}
    </h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      {children}
    </div>
  </div>
);

export default Section;
