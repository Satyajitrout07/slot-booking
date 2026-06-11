import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

export default function Home({ goUser, goAdmin }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* USER */}
        <LazyMotion features={domAnimation}>
          <m.div
            whileHover={
              shouldReduceMotion
                ? {}
                : { scale: 1.03 }
            }
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
          >
            <h1 className="text-4xl font-bold mb-4">
              Candidate Portal
            </h1>

            <p className="text-slate-300 mb-8 leading-7">
              Register and book interview slots with
              companies in real-time.
            </p>

            <button
              type="button"
              onClick={goUser}
              className="w-full bg-indigo-600 py-4 rounded-2xl text-lg"
            >
              Continue as Candidate
            </button>
          </m.div>
        </LazyMotion>

        {/* ADMIN */}
        <LazyMotion features={domAnimation}>
          <m.div
            whileHover={
              shouldReduceMotion
                ? {}
                : { scale: 1.03 }
            }
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
          >
            <h1 className="text-4xl font-bold mb-4">
              HR / Admin Portal
            </h1>

            <p className="text-slate-300 mb-8 leading-7">
              Create slots and manage interview bookings.
            </p>

            <button
              type="button"
              onClick={goAdmin}
              className="w-full bg-emerald-600 py-4 rounded-2xl text-lg"
            >
              Continue as Admin
            </button>
          </m.div>
        </LazyMotion>
      </div>
    </div>
  );
}