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
      <div className="absolute -z-10 h-44 w-44 rounded-full bg-amber-500/10 blur-[80px]" />
      
      <p className="font-display text-8xl font-black tracking-tighter text-amber-400 text-glow select-none">
        404
      </p>
      <h2 className="mt-4 text-xl font-black uppercase tracking-wider text-neutral-100">
        Página fora de jogo
      </h2>
      <p className="mt-2 max-w-xs text-xs font-semibold text-neutral-500 leading-relaxed">
        O conteúdo que você tentou acessar saiu de campo ou ainda não foi escalado para a partida[cite: 22].
      </p>
      <a 
        href="/"
        className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300"
      >
        Voltar para o início
      </a>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell flex min-h-screen flex-col bg-[#030705] text-neutral-300 antialiased selection:bg-amber-500/30 selection:text-amber-400">
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