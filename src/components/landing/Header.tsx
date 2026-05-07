import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
 
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Header = () => {
  return (
    <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 bg-[#080a0c] overflow-hidden">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        {/* SVG de corte diagonal - Ajustado al fondo oscuro */}
        <svg
          className="absolute left-0 hidden h-full text-[#080a0c] transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          alt="Gestión del tiempo"
        />
      </div>

      <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">

          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#00f2ff]/20 bg-[#00f2ff]/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#00f2ff] uppercase">
              Lanzamiento 2026
            </span>
          </motion.div>
 
          <motion.h1
            custom={0.1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-5 font-black tracking-tighter text-white uppercase italic leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Domina cada
            <br className="hidden md:block" />
            segundo con{" "}
            <span className="text-[#00f2ff]">VoltSchedule</span>
          </motion.h1>
 
          <motion.p
            custom={0.2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="pr-5 mb-8 text-base text-gray-400 md:text-lg leading-7"
          >
            La herramienta definitiva para organizar tu día a día. Simplicidad,
            velocidad y control total sobre tu flujo de actividades.
          </motion.p>
 
          <motion.div
            custom={0.3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex items-center gap-6"
          >
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 font-black text-sm tracking-widest text-[#080a0c] bg-[#00f2ff] rounded-xl uppercase transition-all hover:brightness-110 hover:scale-105 active:scale-[0.98]"
              style={{ boxShadow: "0 0 24px rgba(0,242,255,0.2)" }}
            >
              Comenzar
              <ArrowRight size={15} />
            </Link>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center font-bold text-sm text-gray-400 uppercase tracking-[0.2em] transition-colors hover:text-[#00f2ff]"
            >
              Ver más
            </button>
          </motion.div>
 
        </div>
      </div>
    </div>
  );
};
 
