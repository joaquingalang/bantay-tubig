interface BadgeProps {
  variant: "unread" | "read";
}

const variantClasses = {
  unread: "bg-blue-600 text-white",
  read: "bg-gray-700 text-gray-300",
};

export function Badge({ variant }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${variantClasses[variant]}`}
    >
      {variant}
    </span>
  );
}
