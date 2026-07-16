import { Routes, Route, useLocation } from "react-router-dom";
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
    <div className="relative mx-auto max-w-2xl px-5 py-32 text-center flex flex-col items-center justify-center">
      {/* Detalhe de luz ao fundo */}
      <div className="absolute -z-10 h-44 w-44 rounded-full bg-gold/15 blur-[80px]" />

      <p className="font-display text-8xl font-black tracking-tighter text-gold text-glow select-none">
        404
      </p>
      <h2 className="mt-4 text-xl font-black uppercase tracking-wider text-bone">
        Página fora de jogo
      </h2>
      <p className="mt-2 max-w-xs text-xs font-semibold text-bone/50 leading-relaxed">
        O conteúdo que você tentou acessar saiu de campo ou ainda não foi
        escalado para a partida.
      </p>
      <a
        href="/"
        className="mt-8 rounded-xl border border-gold/30 bg-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-bone hover:bg-gold/20 hover:border-gold/50 hover:text-gold transition-all duration-300"
      >
        Voltar para o início
      </a>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell flex min-h-screen flex-col bg-ink text-bone antialiased selection:bg-gold/20 selection:text-gold">
      <Navbar />

      {/* Wrapper principal com animação suave de fade-in ao mudar de rota */}
      <main key={location.pathname} className="flex-1 animate-fade-in">
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
  );
}
