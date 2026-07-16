import { Header } from "../components/layout/Header";
import { Bracket } from "../components/Bracket";

export function Knockout() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Header
        eyebrow="Mata-mata"
        title="Chaveamento"
        description="Das oitavas de final à grande decisão. Arraste para o lado para ver todas as fases."
      />
      <Bracket />
    </div>
  );
}