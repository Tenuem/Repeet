type Props = {
  config: any;
  data: any;
};

const Table = ({ config, data }: Props) => {

  const renderedRows = data.map((flashcard: any) => {
    return (
      <tr key={flashcard.id}>
        {config.map((val: any) => {
          return (
                <td className="p-3">{val.render(flashcard)}</td>
          );
        })}
      </tr>
    );
  });

  const renderedHeaders = config.map((config: any) => {
    return (
      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={config.label}>
        {config.label}
      </th>
    );
  });

  return (
    <div className="bg-[var(--background)] shadow rounded-lg my-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">{renderedHeaders}</thead>
        <tbody className="text-[var(--foreground)]">{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;