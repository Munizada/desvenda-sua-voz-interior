import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "+150 Técnicas Fonoaudiológicas — Estimule a fala do seu filho em casa" },
      {
        name: "description",
        content:
          "Descubra, em 2 minutos, o que pode estar travando a fala do seu filho — e receba um plano simples para estimular a comunicação em casa, sem culpa e sem achismo.",
      },
      { property: "og:title", content: "Descubra o que pode estar dificultando a fala do seu filho" },
      {
        property: "og:description",
        content:
          "Quiz rápido + acesso ao método com +150 técnicas práticas para estimular a fala infantil em casa.",
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
    q: "O que mais te preocupa hoje na fala ou comunicação do seu filho?",
    options: [
      "Ele fala pouco e eu sinto que deveria estar se comunicando mais.",
      "Ele até tenta falar, mas muitas vezes ninguém entende direito.",
      "Ele se irrita quando não consegue explicar o que quer.",
      "Eu sinto que tem algo atrasando a fala dele, mas não sei exatamente o quê.",
    ],
  },
  {
    q: "Quando você compara seu filho com outras crianças da mesma idade, o que você sente?",
    options: [
      "Um aperto no peito, porque outras crianças parecem falar com mais facilidade.",
      "Uma insegurança constante, porque não sei se o desenvolvimento dele está dentro do esperado.",
      "Uma culpa silenciosa, como se eu pudesse ter feito mais antes.",
      "Uma preocupação diária, porque percebo diferenças na forma como ele se comunica.",
    ],
  },
  {
    q: "O que costuma acontecer quando seu filho tenta se expressar e não consegue?",
    options: [
      "Ele fica irritado, chora ou demonstra frustração.",
      "Ele aponta, grita ou tenta se fazer entender de outras formas.",
      "Ele desiste de falar e acaba se fechando.",
      "Eu fico angustiada porque vejo que ele quer falar, mas não consegue como gostaria.",
    ],
  },
  {
    q: "Como você se sente quando tenta estimular a fala dele em casa?",
    options: [
      "Perdida, porque não sei quais atividades realmente ajudam.",
      "Insegura, porque tenho medo de fazer errado.",
      "Frustrada, porque começo uma atividade e ele perde o interesse rápido.",
      "Ansiosa, porque sinto que preciso fazer algo, mas não sei por onde começar.",
    ],
  },
  {
    q: "Qual dessas situações mais mexe com você?",
    options: [
      "Ver meu filho tentando falar e as pessoas não entenderem.",
      "Escutar comentários como “ele ainda não fala direito?”.",
      "Perceber que ele evita falar perto de outras pessoas.",
      "Imaginar que ele pode sofrer na escola por não conseguir se comunicar bem.",
    ],
  },
  {
    q: "Quando seu filho fala, o que você percebe com mais frequência?",
    options: [
      "Ele troca sons ou pronuncia algumas palavras de forma confusa.",
      "Ele fala enrolado e eu preciso traduzir para outras pessoas.",
      "Ele usa poucas palavras para expressar o que quer.",
      "Ele parece ter dificuldade para imitar sons, movimentos ou palavras novas.",
    ],
  },
  {
    q: "O que você já sentiu ao procurar atividades para estimular a fala infantil?",
    options: [
      "Que existe muita informação solta e pouca orientação prática.",
      "Que eu salvo várias dicas, mas não sei qual aplicar primeiro.",
      "Que os conteúdos parecem bonitos, mas não explicam exatamente o que observar.",
      "Que eu preciso de algo mais organizado para não ficar tentando no escuro.",
    ],
  },
  {
    q: "O que mais pesa emocionalmente para você nessa situação?",
    options: [
      "A culpa de pensar que talvez eu tenha demorado para agir.",
      "O medo de que essa dificuldade afete o futuro dele.",
      "A sensação de impotência quando vejo ele tentando se comunicar.",
      "A ansiedade de não saber se estou fazendo o suficiente.",
    ],
  },
  {
    q: "Entre uma orientação e outra, como você se sente no dia a dia?",
    options: [
      "Sozinha, porque queria saber exatamente como ajudar em casa.",
      "Preocupada, porque sinto que cada dia sem estímulo certo pode fazer diferença.",
      "Insegura, porque não sei se estou reforçando do jeito correto.",
      "Cansada de depender apenas de dicas soltas ou esperar a próxima consulta.",
    ],
  },
  {
    q: "Se você pudesse resolver uma coisa agora, qual seria a mais importante?",
    options: [
      "Ter atividades prontas para estimular a fala dele de forma simples.",
      "Saber como conduzir brincadeiras que realmente ajudam na comunicação.",
      "Conseguir perceber pequenas evoluções sem ficar perdida.",
      "Sentir que estou fazendo algo concreto para ajudar meu filho a falar melhor.",
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
        <span className="chip">Quiz rápido · 2 minutos</span>
        <h1 className="mt-5 text-balance text-center text-[2rem] font-black leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
          Descubra o que pode estar{" "}
          <span className="italic text-[var(--coral)]">dificultando a fala</span>{" "}
          do seu filho
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-center text-base text-muted-foreground sm:text-lg">
          Responda 10 perguntas rápidas e receba um diagnóstico simples — junto com um plano
          prático para estimular a comunicação dele em casa, sem culpa e sem achismo.
        </p>

        <button
          onClick={onStart}
          className="btn-cta mt-8 min-h-12 w-full max-w-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
        >
          Começar o quiz agora →
        </button>

        <ul className="mt-8 grid w-full max-w-lg gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          {[
            "Feito com base em técnicas fonoaudiológicas",
            "Resposta personalizada no final",
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
                Você não está procurando “mais uma atividade”.
                <span className="block italic text-[var(--coral)]">
                  Você quer saber exatamente o que fazer em casa.
                </span>
              </h1>
              <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
                Pelas suas respostas, fica claro: você está cansada de dicas soltas, de salvar
                vídeos que nunca aplica e de sentir culpa de “não estar fazendo o suficiente”.
                O que você precisa é de um caminho organizado, leve e que caiba na sua rotina.
              </p>
              <p className="mt-4 text-base text-foreground">
                <strong>+150 Técnicas Fonoaudiológicas</strong> foi feito exatamente para isso:
                transformar a estimulação da fala em momentos simples, afetivos e com evolução
                visível.
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
            Se você é mãe e se reconhece em alguma dessas frases…
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Você não está sozinha — e o problema não é falta de amor nem de esforço.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "“Sei que ele entende tudo, mas quase ninguém compreende o que ele fala.”",
              "“Eu salvo dezenas de vídeos de estimulação, mas nunca sei por onde começar.”",
              "“Sinto culpa de pensar que talvez eu tenha demorado para agir.”",
              "“Tenho medo de que essa dificuldade afete o futuro dele na escola.”",
              "“Começo uma atividade e ele perde o interesse em poucos minutos.”",
              "“Estou cansada de parecer forte por fora e estar exausta por dentro.”",
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
              <span className="chip">Mães reais · Resultados reais</span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Mães que pararam de “tentar no escuro” e viram a fala evoluir
              </h2>
              <p className="mt-3 text-muted-foreground">
                Depoimentos espontâneos de quem aplicou as técnicas em casa, no dia a dia.
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
                    alt={`Depoimento ${i + 1} de mãe que usou o método`}
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
              alt="Comparativo entre tentar sozinha e seguir o método"
              className="w-full rounded-3xl shadow-xl"
              loading="lazy"
            />
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">
                A diferença entre <span className="text-[var(--coral)]">tentar adivinhar</span> e{" "}
                <span className="text-[var(--primary)]">seguir um plano</span>
              </h2>
              <ul className="mt-6 space-y-3 text-foreground">
                {[
                  "Saber exatamente qual técnica usar em cada dificuldade.",
                  "Trocar a culpa pela clareza de estar ajudando do jeito certo.",
                  "Atividades curtas (5–10 min) que cabem na rotina real.",
                  "Linguagem simples — você não precisa ser fonoaudióloga.",
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
                Cada técnica vem com explicação simples, frases-modelo e o passo a passo de
                como aplicar com seu filho em casa.
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
                  Comece hoje a estimular a fala do seu filho — com leveza e direção
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Acesso imediato a <strong>+150 técnicas fonoaudiológicas</strong>, 4 bônus e
                  atualizações vitalícias.
                </p>
                <div className="mt-6 flex items-end gap-3">
                  <span className="text-sm text-muted-foreground line-through">De R$ 197</span>
                  <span className="text-4xl font-black text-[var(--coral)] sm:text-5xl">
                    R$ 27
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">à vista</span>
                </div>

                <a href={CHECKOUT_URL} className="btn-cta mt-6 w-full sm:w-auto">
                  Quero acessar agora →
                </a>
                <p className="mt-3 text-xs text-muted-foreground">
                  Pagamento 100% seguro · Acesso imediato após a compra
                </p>

                <ul className="mt-6 grid gap-2 text-sm text-foreground">
                  {[
                    "Mais de 150 técnicas organizadas por objetivo",
                    "Frases-modelo e respostas esperadas para cada atividade",
                    "Adaptações para crianças que perdem o interesse rápido",
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
            Você merece parar de tentar no escuro. Em poucos minutos por dia, você vai sentir
            que está finalmente fazendo algo concreto pela fala — e pela autoestima — do seu filho.
          </p>
        </section>

        <footer className="border-t border-border bg-white py-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} +150 Técnicas Fonoaudiológicas · Todos os direitos reservados
        </footer>
    </main>
  );
}

