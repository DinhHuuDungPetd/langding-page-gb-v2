import "./globals.css";

export const metadata = {
    title: "Green Lab",
    description: "Khát vọng vươn xa",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>
        {children}
      </body>
    </html>
  );
}

