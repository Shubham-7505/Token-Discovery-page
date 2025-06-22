export default function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
        </td>
      ))}
    </tr>
  );
}
