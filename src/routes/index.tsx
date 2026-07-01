import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "+150 Técnicas Fonoaudiológicas — Acervo de Atividades e Orientação Parental" },
      {
        name: "description",
        content:
          "Descubra qual é o maior gargalo nas suas sessões e na adesão dos pais — e tenha acesso a um acervo com +150 técnicas estruturadas para turbinar seus atendimentos clínicos.",
      },
      { property: "og:title", content: "Descubra qual o maior gargalo nas suas sessões e na adesão dos pais" },
      {
        property: "og:description",
        content:
          "Quiz rápido + acesso ao acervo com +150 técnicas práticas prontas para aplicar em terapia e enviar como orientação de casa.",
      },
      { property: "og:image", content: "/images/social-1779800361542-hero-mockup-Dt4a8q1o.webp" },
    ],
  }),
  component: LandingPage,
});

/* ------------------------------ QUIZ DATA ------------------------------ */

type QuizQ = { q: string; options: string[] };

const QUIZ: QuizQ[] = [
  {
    q: "Qual é o seu maior desafio hoje na rotina de atendimentos de estimulação de fala?",
    options: [
      "Falta de tempo para planejar sessões dinâmicas e personalizadas.",
      "Os pais não dão continuidade às orientações e estimulações em casa.",
      "Falta de recursos visuais e materiais práticos e organizados para os pacientes.",
      "Manter a criança engajada e motivada durante toda a sessão terapêutica.",
    ],
  },
  {
    q: "Como você se sente quando precisa enviar tarefas ou orientações para a família realizar em casa?",
    options: [
      "Frustrada(o), porque sei que a maioria dos pais não vai conseguir aplicar dicas soltas.",
      "Insegura(o), se a explicação foi clara o suficiente para eles executarem certo.",
      "Sobrecarregada(o), por ter que criar ou adaptar materiais personalizados para cada família.",
      "Preocupada(o), pois a falta de estimulação em casa atrasa a evolução clínica.",
    ],
  },
  {
    q: "O que costuma acontecer quando um paciente infantil demonstra resistência ou perde o foco na sessão?",
    options: [
      "Fico sem alternativas rápidas de atividades lúdicas para redirecionar o foco.",
      "Preciso improvisar com materiais que nem sempre estão alinhados com o objetivo terapêutico.",
      "A sessão acaba rendendo menos do que o planejado e gera frustração.",
      "Gasto muita energia tentando achar novos estímulos na hora e me desgasto.",
    ],
  },
  {
    q: "Ao planejar o cronograma de estimulação de fala para os seus pacientes, o que você mais sente falta?",
    options: [
      "Um acervo organizado com técnicas passo a passo e frases de modelo prontas para uso.",
      "Materiais lúdicos, ilustrados e de fácil compreensão para os pais aplicarem sem dificuldades.",
      "Uma sequência de atividades dividida por níveis de complexidade ou objetivos.",
      "Variedade de ideias práticas para enriquecer meus atendimentos sem perder horas pesquisando.",
    ],
  },
  {
    q: "Qual dessas situações na sua prática clínica mais te causa incômodo ou frustração?",
    options: [
      "Ver o progresso do paciente estagnar porque a família não realiza a estimulação no lar.",
      "Perceber que gastei horas do meu final de semana planejando sessões e criando materiais.",
      "Ouvir dos pais que 'tentaram fazer em casa' mas a criança não quis ou eles não souberam como.",
      "Ficar sem ideias novas para pacientes que já estão comigo há bastante tempo.",
    ],
  },
  {
    q: "Ao avaliar um paciente com atraso de fala ou desvio fonológico, qual é o seu principal foco ao escolher técnicas?",
    options: [
      "Técnicas que facilitem a produção de fonemas específicos de forma lúdica.",
      "Estratégias de expansão de vocabulário e estruturação de frases na rotina.",
      "Atividades de estimulação de fala espontânea por meio de contextos interativos.",
      "Dicas práticas de conscientização fonológica de fácil replicação pelos pais.",
    ],
  },
  {
    q: "Qual é a sua principal queixa em relação aos materiais de fonoaudiologia infantil do mercado?",
    options: [
      "Muitos são teóricos demais e trazem poucas ideias de aplicação prática real na sessão.",
      "Materiais soltos na internet sem um método claro ou explicação sobre como adaptá-los.",
      "Conteúdos visualmente pouco atraentes ou que exigem muita preparação física complexa.",
      "Falta de instruções claras que eu possa repassar diretamente para os pais sem jargão técnico.",
    ],
  },
  {
    q: "Como você avalia a sua sobrecarga de trabalho com planejamento de sessões fora do consultório?",
    options: [
      "Alta, levo muito trabalho de preparação de atividades para casa nos finais de semana.",
      "Média, mas perco um tempo precioso que poderia usar para captar clientes ou descansar.",
      "Estressante, sinto que estou sempre correndo atrás de novas dinâmicas para não ser repetitiva(o).",
      "Preocupante, pois sinto que a falta de um acervo unificado me faz perder produtividade.",
    ],
  },
  {
    q: "Como você avalia a comunicação e alinhamento com os pais sobre a lição de casa dos pacientes?",
    options: [
      "Difícil, pois eles acham que a terapia de 50 minutos semanais é suficiente por si só.",
      "Pouco efetiva, eles esquecem as orientações verbais ou acham as tarefas complexas demais.",
      "Desgastante, preciso ficar cobrando feedback sobre a estimulação doméstica constantemente.",
      "Inconsistente, pois faltam instruções impressas e objetivas para guiar o treino diário.",
    ],
  },
  {
    q: "Se você pudesse otimizar apenas um pilar da sua prática clínica hoje, qual escolheria?",
    options: [
      "Ter um acervo pronto de mais de 150 técnicas fonoaudiológicas para usar na hora e compartilhar.",
      "Aumentar a adesão das famílias às tarefas de casa com orientações simples e visuais.",
      "Reduzir meu tempo de planejamento de sessões pela metade sem perder a qualidade.",
      "Elevar a satisfação dos clientes mostrando resultados mais rápidos por meio do reforço doméstico.",
    ],
  },
];

const CHECKOUT_URL = "#oferta"; // troque pelo link real de checkout

/* ------------------------------ COMPONENT ------------------------------ */

type Stage = "intro" | "quiz" | "sales";

function LandingPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);




  useEffect(() => {
    if (stage === "sales") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [stage]);

  const progress = useMemo(
    () => Math.round(((step + (stage === "quiz" ? 0 : 1)) / QUIZ.length) * 100),
    [step, stage],
  );

  function pick(i: number) {
    const next = [...answers, i];
    setAnswers(next);
    if (step + 1 < QUIZ.length) {
      setStep(step + 1);
    } else {
      setStage("sales");
    }
  }

  if (stage === "intro") return <Intro onStart={() => setStage("quiz")} />;
  if (stage === "quiz")
    return (
      <Quiz
        step={step}
        progress={progress}
        question={QUIZ[step]}
        onPick={pick}
        onBack={() => {
          if (step === 0) setStage("intro");
          else {
            setStep(step - 1);
            setAnswers(answers.slice(0, -1));
          }
        }}
      />
    );
  return <Sales />;
}

/* ------------------------------- INTRO -------------------------------- */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <main className="min-h-dvh bg-[var(--cream)]">
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-5 py-12">
        <span className="chip">Para Fonoaudiólogos · 2 minutos</span>
        <h1 className="mt-5 text-balance text-center text-[2rem] font-black leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
          Descubra qual é o maior{" "}
          <span className="italic text-[var(--coral)]">gargalo nas suas sessões</span>{" "}
          e na adesão dos pais
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-center text-base text-muted-foreground sm:text-lg">
          Responda 10 perguntas rápidas e receba um diagnóstico da sua prática de estimulação e orientação — junto com um acervo prático de +150 técnicas estruturadas para turbinar seus atendimentos.
        </p>

        <button
          onClick={onStart}
          className="btn-cta mt-8 min-h-12 w-full max-w-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
        >
          Começar o quiz agora →
        </button>

        <ul className="mt-8 grid w-full max-w-lg gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          {[
            "Material prático de apoio clínico",
            "Diagnóstico do perfil de atendimento",
            "100% gratuito",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

/* -------------------------------- QUIZ -------------------------------- */

function Quiz({
  step,
  progress,
  question,
  onPick,
  onBack,
}: {
  step: number;
  progress: number;
  question: QuizQ;
  onPick: (i: number) => void;
  onBack: () => void;
}) {
  return (
    <main className="min-h-dvh bg-[var(--cream)]">
      <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <button
            onClick={onBack}
            aria-label="Voltar para a pergunta anterior"
            className="inline-flex min-h-11 items-center rounded-md px-2 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            ← Voltar
          </button>
          <span aria-live="polite">Pergunta {step + 1} de {QUIZ.length}</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do quiz"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--coral)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="mt-8 text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {question.q}
        </h2>

        <div className="mt-6 grid gap-3" role="list">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onPick(i)}
              className="group flex min-h-14 items-start gap-4 rounded-2xl border-2 border-border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:p-5"
            >
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary font-bold text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="pt-1 text-base text-foreground sm:text-[1.05rem]">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

/* -------------------------------- SALES ------------------------------- */

const DEPOIMENTOS = [
  "/images/depoimento-1-Jg2QSLZZ.webp",
  "/images/depoimento-2-CTKdzY54.webp",
  "/images/depoimento-3-Bg28OxmW.webp",
  "/images/depoimento-4-CFVnUE4G.webp",
  "/images/depoimento-dasneves-S71_HG0_.webp",
];

const PRODUTO_IMAGENS = [
  "/images/hero-mockup-Dt4a8q1o.webp",
  "/images/capa-150-tecnicas.png",
  "/images/ex-44.webp",
  "/images/ex-45.webp",
  "/images/ex-46.webp",
  "/images/ex-47.webp",
  "/images/ex-48.webp",
  "/images/ex-49.webp",
  "/images/ex-50.webp",
  "/images/oferta-plano-completo-BlphOMcB.webp",
];

const BONUS = [
  { img: "/images/bonus-1-BX9f6Zt2.webp", title: "Bônus 1" },
  { img: "/images/bonus-2-ByPdJf08.webp", title: "Bônus 2" },
  { img: "/images/bonus-3-Dp42SgfW.webp", title: "Bônus 3" },
  { img: "/images/bonus-4-BRPUyRWa.webp", title: "Bônus 4" },
];

function Sales() {
  return (
    <main className="bg-[var(--cream)]">
      {/* ============ HERO / RESULTADO ============ */}
      <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color-mix(in_oklab,var(--primary)_14%,white)] to-transparent" />
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-10 sm:pt-16 md:grid-cols-2 md:items-center md:gap-14 md:pb-16">
            <div>
              <span className="chip">Resultado do seu quiz</span>
              <h1 className="mt-4 text-balance text-[2rem] font-black leading-[1.1] text-foreground sm:text-5xl md:text-[3.25rem]">
                Você não precisa passar horas planejando sessões.
                <span className="block italic text-[var(--coral)]">
                  Você quer um acervo pronto para atender e orientar.
                </span>
              </h1>
              <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
                Pelas suas respostas, fica claro: você quer otimizar seu tempo, reduzir a sobrecarga de planejar atendimentos do zero e encontrar uma forma eficaz de garantir a estimulação correta no ambiente familiar. O que você precisa é de um acervo prático, direto e lúdico que sirva tanto para enriquecer suas sessões quanto para engajar os pais nas orientações.
              </p>
              <p className="mt-4 text-base text-foreground">
                O manual <strong>+150 Técnicas Fonoaudiológicas</strong> foi estruturado exatamente para isso:
                simplificar sua rotina clínica, fornecendo atividades ilustradas com objetivos claros e facilidade de replicação pelos pais em casa.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={CHECKOUT_URL}
                  className="btn-cta min-h-12 w-full justify-center sm:w-auto"
                >
                  Ver o plano completo →
                </a>
                <span className="text-sm text-muted-foreground">
                  Acesso imediato · Garantia de 30 dias
                </span>
              </div>
            </div>
            <div className="relative order-first md:order-none">
              <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--sun)]/40 to-[var(--primary)]/20 blur-2xl" />
              <img
                src="/images/hero-mockup-Dt4a8q1o.webp"
                alt="Capa do método +150 Técnicas Fonoaudiológicas"
                width={640}
                height={640}
                className="mx-auto h-auto w-full max-w-xs drop-shadow-2xl sm:max-w-md"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* ============ DORES / RECONHECIMENTO ============ */}
        <section className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-center text-3xl font-black sm:text-4xl">
            Se você é fonoaudiólogo(a) e se reconhece em alguma dessas frases…
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Esses desafios são comuns na rotina de atendimento infantil — mas existe uma forma mais inteligente de organizar suas sessões e condutas.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "“Levo muito trabalho de planejamento de sessões e criação de materiais para os finais de semana.”",
              "“Os pais dizem que esquecem as orientações verbais ou que não sabem como aplicar as atividades em casa.”",
              "“Pacientes antigos demonstram tédio e preciso inventar novas estratégias lúdicas constantemente.”",
              "“Gasto muito tempo e dinheiro imprimindo e recortando recursos terapêuticos complexos toda semana.”",
              "“Gostaria de ter um acervo padronizado de rápida consulta para diferentes objetivos de estimulação.”",
              "“Sinto sobrecarga ao tentar conciliar o atendimento clínico com a produção de materiais didáticos.”",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-border bg-card p-5 text-foreground shadow-sm"
              >
                {t}
              </div>
            ))}
          </div>
        </section>

        {/* ============ PROVAS SOCIAIS (após o hero) ============ */}
        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <span className="chip">Fonoaudiólogos reais · Resultados reais</span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Profissionais que pararam de criar tudo do zero e otimizaram seus resultados
              </h2>
              <p className="mt-3 text-muted-foreground">
                Veja o feedback de quem utiliza nosso acervo na prática clínica diária e na orientação parental.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DEPOIMENTOS.map((src, i) => (
                <figure
                  key={src}
                  className="overflow-hidden rounded-3xl border border-border bg-[var(--cream)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={src}
                    alt={`Depoimento ${i + 1} de fonoaudiólogo que usou o método`}
                    className="h-auto w-full"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <img
                src="/images/trust-badges-B_a-luq4.webp"
                alt="Selos de confiança e pagamento seguro"
                className="w-full max-w-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ============ PROMESSA / DOIS LADOS ============ */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <img
              src="/images/dois-lados-C4dckFPO.webp"
              alt="Comparativo entre planejar tudo do zero e seguir o acervo"
              className="w-full rounded-3xl shadow-xl"
              loading="lazy"
            />
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">
                A diferença entre <span className="text-[var(--coral)]">planejar tudo do zero</span> e{" "}
                <span className="text-[var(--primary)]">ter um acervo pronto</span>
              </h2>
              <ul className="mt-6 space-y-3 text-foreground">
                {[
                  "Ter ideias de atividades prontas e com objetivos definidos em segundos.",
                  "Enviar tarefas de casa profissionais que facilitam o entendimento e adesão dos pais.",
                  "Atividades curtas (5–10 min) fáceis de integrar na sessão ou na rotina da família.",
                  "Linguagem simples nas orientações — ideal para os pais replicarem com segurança.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ IMAGENS DO PRODUTO (antes do CTA) ============ */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <span className="chip">O que tem por dentro</span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                +150 técnicas prontas, organizadas e ilustradas
              </h2>
              <p className="mt-3 text-muted-foreground">
                Cada técnica vem com objetivo fonoaudiológico claro, frases-modelo, respostas esperadas e orientações mastigadas para repassar aos pais.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {PRODUTO_IMAGENS.map((src, i) => (
                <div
                  key={src}
                  className={`overflow-hidden rounded-2xl border border-border bg-[var(--cream)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    i === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt={`Exemplo de página do método ${i + 1}`}
                    className="aspect-[4/5] h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            <div className="mt-14">
              <h3 className="text-center text-2xl font-black sm:text-3xl">
                E ainda, 4 bônus inclusos
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {BONUS.map((b) => (
                  <div
                    key={b.img}
                    className="overflow-hidden rounded-2xl border border-border bg-[var(--cream)] shadow-sm"
                  >
                    <img src={b.img} alt={b.title} className="w-full" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA FINAL ============ */}
        <section id="oferta" className="px-5 py-16">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-2xl sm:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_10%,white)] via-white to-[color-mix(in_oklab,var(--coral)_10%,white)]" />
            <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
              <div>
                <span className="chip">Oferta especial</span>
                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                  Facilite seus atendimentos e otimize a orientação parental a partir de hoje
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Acesso imediato ao acervo de <strong>+150 técnicas fonoaudiológicas</strong>, 4 bônus exclusivos e atualizações vitalícias.
                </p>
                <div className="mt-6 flex items-end gap-3">
                  <span className="text-sm text-muted-foreground line-through">De R$ 197</span>
                  <span className="text-4xl font-black text-[var(--coral)] sm:text-5xl">
                    R$ 14,99
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">à vista</span>
                </div>

                <a
                  href="https://syncpay.link/RwUdGN"
                  className="btn-cta mt-6 min-h-12 w-full justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
                >
                  Quero acessar agora →
                </a>
                <p className="mt-3 text-xs text-muted-foreground">
                  Pagamento 100% seguro · Acesso imediato após a compra
                </p>

                <ul className="mt-6 grid gap-2 text-sm text-foreground">
                  {[
                    "Mais de 150 técnicas prontas organizadas por objetivos terapêuticos",
                    "Instruções didáticas e frases-modelo prontas para orientar os pais",
                    "Dinâmicas lúdicas para engajar crianças com perfis variados",
                    "Acesso vitalício + atualizações futuras grátis",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center gap-5">
                <img
                  src="/images/oferta-plano-completo-BlphOMcB.webp"
                  alt="Plano completo +150 Técnicas Fonoaudiológicas"
                  className="w-full max-w-sm drop-shadow-xl"
                  loading="lazy"
                />
                <img
                  src="/images/garantia-30-dias-C8t9aASy.webp"
                  alt="Garantia incondicional de 30 dias"
                  className="w-40"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            Sua rotina clínica merece essa praticidade. Poupe tempo de planejamento, eleve a qualidade das suas sessões e proporcione um progresso visível estimulando a parceria com as famílias.
          </p>
        </section>

        <footer className="border-t border-border bg-white py-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} +150 Técnicas Fonoaudiológicas · Todos os direitos reservados
        </footer>
    </main>
  );
}

