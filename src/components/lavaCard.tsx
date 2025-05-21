// components/LavaGradientBackground.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface LavaGradientProps {
  colors: string[];
  movent: keyof typeof movents;
}

const movents = {
  a: ["0% 50%", "50% 0%", "100% 50%", "50% 100%", "0% 50%"],
  b: ["25% 75%", "75% 75%", "75% 25%", "25% 25%", "25% 75%"],
  c: ["0% 0%", "100% 0%", "0% 100%", "100% 100%", "0% 0%"],
};

export function LavaGradientBackground({ colors, movent = "a" }: LavaGradientProps) {
  const controls = useAnimation();
  const positions = movents[movent] ?? movents.a;
  useEffect(() => {
    controls.start({
      backgroundPosition: positions,
      transition: {
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
      },
    });
  }, [controls]);
  const gradient = `radial-gradient(circle at 10% 10%, ${colors.join(", ")})`;
  return (
    <motion.div
      className="absolute inset-0 z-0 rounded-2xl"
      animate={controls}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 200%",
        willChange: "background-position",
      }}
    />
  );
}

interface ContentProps {
  title: string;
  content: string;
  className: string;
  colors: string[];
  movent: keyof typeof movents;
}

export default function LavaCard({
  title,
  content,
  className,
  colors,
  movent
}: ContentProps) {
  return (
    <div className={`${className} relative overflow-hidden rounded-2xl`}>
      <LavaGradientBackground colors={colors} movent={movent}/>
      <div className="relative z-10 flex flex-col h-full">
        <p className="m-4 font-black text-2xl text-[#ffffff]">{title}</p>
        <p className="mx-4 font-sans text-sm text-[#ffffff99]">{content}</p>
      </div>
    </div>
  );
}
