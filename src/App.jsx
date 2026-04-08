import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    filter: 'blur(8px)',
  }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)' },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    filter: 'blur(8px)',
  }),
};

const stagger = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function MembersSlide({ slide }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-acid/80">Project Members</p>
        <h1 className="font-display text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
          {slide.title}
        </h1>
        {slide.subtitle ? (
          <p className="max-w-xl text-lg text-fog/75">{slide.subtitle}</p>
        ) : null}
        <div className="inline-flex items-center gap-3 rounded-full border border-acid/30 bg-acid/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-acid">
          Waste Wars
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {slide.members.map((member) => (
          <div
            key={member}
            className="rounded-2xl border border-acid/20 bg-gradient-to-br from-moss/80 via-moss/40 to-ink/80 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
          >
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-acid/70">
              Roll No.
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">{member}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DefaultSlide({ slide }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        {slide.kicker ? (
          <p className="text-xs uppercase tracking-[0.45em] text-acid/80">{slide.kicker}</p>
        ) : null}
        <h1 className="font-display text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
          {slide.title}
        </h1>
        {slide.subtitle ? (
          <p className="max-w-xl text-lg text-fog/75">{slide.subtitle}</p>
        ) : null}
        {slide.badge ? (
          <div className="inline-flex items-center gap-3 rounded-full border border-acid/30 bg-acid/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-acid">
            {slide.badge}
          </div>
        ) : null}
      </div>
      <div className="space-y-4">
        {slide.points?.length
          ? slide.points.map((point) => (
              <motion.div
                key={point}
                variants={item}
                className="rounded-2xl border border-acid/15 bg-[#0f1911]/70 p-5 text-base text-fog/85 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
              >
                {point}
              </motion.div>
            ))
          : null}
      </div>
    </div>
  );
}

function MetricsSlide({ slide }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        {slide.kicker ? (
          <p className="text-xs uppercase tracking-[0.45em] text-acid/80">{slide.kicker}</p>
        ) : null}
        <h1 className="font-display text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
          {slide.title}
        </h1>
        {slide.subtitle ? (
          <p className="max-w-xl text-lg text-fog/75">{slide.subtitle}</p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {slide.metrics?.length
          ? slide.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-acid/20 bg-gradient-to-br from-[#0e1811] via-[#0f1a12] to-[#0c120d] p-5 shadow-[0_20px_55px_rgba(0,0,0,0.45)]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-acid/70">{metric.label}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm text-fog/70">{metric.detail}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default function App() {
  const slides = useMemo(
    () => [
      {
        id: 'members',
        type: 'members',
        title: 'Waste Wars',
        subtitle: 'An Eco-Friendly Project',
        members: ['24SW121', '24SW078', '24SW169', '24SW142'],
      },
      {
        id: 'problem',
        type: 'default',
        kicker: 'Problem',
        title: 'Problem',
        subtitle:
          'Recycling is inconsistent because people lack visibility, motivation, and feedback.',
        badge: 'Challenges',
        points: [
          'No real-time data on how much waste is properly segregated.',
          'Low participation because recycling feels unrewarding.',
          'Manual reporting makes tracking slow and unreliable.',
        ],
      },
      {
        id: 'solution',
        type: 'default',
        kicker: 'Solution',
        title: 'Solution',
        subtitle:
          'Waste Wars turns recycling into a competitive, rewarding experience.',
        badge: 'Core Idea',
        points: [
          'Verify waste submissions with photo proof.',
          'Reward users with eco‑points.',
          'Show impact instantly through community dashboards.',
        ],
      },
      {
        id: 'how',
        type: 'default',
        kicker: 'Process',
        title: 'How It Works',
        subtitle:
          'A simple loop that encourages habit formation and long‑term engagement.',
        badge: 'Workflow',
        points: [
          'User sorts waste and submits a photo or scan.',
          'System verifies and awards eco‑points.',
          'Points unlock rewards and update the leaderboard.',
          'Admins monitor progress and optimize collection.',
        ],
      },
      {
        id: 'features',
        type: 'default',
        kicker: '',
        title: 'Key Features',
        subtitle: '',
        badge: '',
        points: [
          'Dashboard',
          'Leaderboard',
          'Rewards system',
          'Profile',
        ],
      },
      {
        id: 'stack',
        type: 'default',
        kicker: 'Build',
        title: 'Tech Stack',
        subtitle: 'Reliable, fast tools for a modern civic platform.',
        badge: 'Tools',
        points: [
          'Frontend: React + Vite for fast, responsive UI.',
          'Backend: Spring Boot for secure APIs and business logic.',
          'Database: MySQL for users, rewards, and submissions.',
          'Analytics: KPI dashboards for impact tracking.',
        ],
      },
      {
        id: 'impact',
        type: 'default',
        kicker: 'Impact & Future',
        title: 'Impact & Future',
        subtitle: 'Better habits today, smarter infrastructure tomorrow.',
        badge: 'Outcomes',
        points: [
          'Increase recycling rate',
          'Cleaner campus',
          'Future: Mobile app + QR bins',
        ],
      },
      {
        id: 'closing',
        type: 'default',
        kicker: '',
        title: 'Recycle Today, Reward Tomorrow',
        subtitle: 'Thank You!',
        badge: '',
        points: [],
      },
    ],
    []
  );

  const [[page, direction], setPage] = useState([0, 0]);
  const slide = slides[page];

  const paginate = useCallback(
    (newDirection) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + slides.length) % slides.length;
        return [next, newDirection];
      });
    },
    [slides.length]
  );

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'ArrowRight') paginate(1);
      if (event.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paginate]);

  return (
    <div className="h-screen overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 bg-[length:60px_60px] bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-acid/10 blur-3xl" />
        <div className="absolute right-[-120px] top-32 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-80 w-80 rounded-full bg-acid/10 blur-3xl" />
      </div>

      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-8">
        <div className="mb-8 flex items-center justify-between text-xs uppercase tracking-[0.4em] text-acid/70">
          <span>Waste Wars</span>
          <span>
            {page + 1} / {slides.length}
          </span>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div variants={stagger} initial="hidden" animate="show">
              {slide.type === 'members' ? (
                <MembersSlide slide={slide} />
              ) : slide.type === 'metrics' ? (
                <MetricsSlide slide={slide} />
              ) : (
                <DefaultSlide slide={slide} />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => paginate(-1)}
              className="rounded-full border border-acid/30 bg-acid/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-acid shadow-glow"
            >
              Prev
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => paginate(1)}
              className="rounded-full border border-emerald-200/40 bg-emerald-200/15 px-5 py-2 text-xs uppercase tracking-[0.35em] text-emerald-50"
            >
              Next
            </motion.button>
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-acid/60">Use arrow keys</p>
        </div>
      </div>
    </div>
  );
}
