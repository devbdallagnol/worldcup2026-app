import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Groups } from "./pages/Groups";
import { Teams } from "./pages/Teams";
import { TeamDetail } from "./pages/TeamDetail";
import { Matches } from "./pages/Matches";
import { Knockout } from "./pages/Knockout";
import "./App.css";

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="font-display text-6xl text-gold">404</p>
      <p className="mt-3 text-bone/60">Essa página saiu de campo.</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grupos" element={<Groups />} />
            <Route path="/selecoes" element={<Teams />} />
            <Route path="/selecoes/:teamId" element={<TeamDetail />} />
            <Route path="/jogos" element={<Matches />} />
            <Route path="/mata-mata" element={<Knockout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
