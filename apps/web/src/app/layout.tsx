export const metadata = {
  title: "Entrepreneur-Investor Platform",
  description: "Connect entrepreneurs with investors through AI-powered matchmaking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
