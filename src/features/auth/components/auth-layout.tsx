export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-sm w-full">{children}</div>
    </div>
  );
}
