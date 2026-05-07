import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/landing/Navbar";
import { Footer } from "../components/landing/Footer";

const HIDDEN_LAYOUT_ROUTES = ["/login", "/register", "/forgot-password"];

export default function PublicLayout() {
  const { pathname } = useLocation();
  const hideLayout = HIDDEN_LAYOUT_ROUTES.includes(pathname);

  return (
    <div className="min-h-screen bg-[#080a0c] flex flex-col antialiased">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}
