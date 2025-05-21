// components/DropBlob.tsx
import { motion } from "framer-motion";

interface DropBlobProps {
  size: number;
  duration: number;
  delay?: number;
  opacity?: number;
  color: string;
  movent: string;
}

const paths = [
  "M42.8,-54.5C55.3,-44.1,61.7,-27.2,61.8,-10.1C61.8,7,55.5,24.2,45,36.3C34.4,48.3,19.6,55.1,3.3,56.6C-13,58.1,-29.1,54.4,-42.7,45.3C-56.2,36.2,-67.2,21.7,-70.9,5.1C-74.6,-11.6,-70.9,-29.2,-59.4,-40.9C-47.8,-52.6,-28.9,-58.5,-10.3,-56.9C8.3,-55.3,16.6,-46.9,42.8,-54.5Z",
  "M37.8,-49.1C49.8,-38.6,56.6,-23.7,60.1,-7.3C63.6,9.2,63.9,25.9,55.1,37.7C46.3,49.4,28.4,56.3,9.3,55.9C-9.8,55.5,-29.6,47.8,-42,35.8C-54.3,23.8,-59.2,7.6,-58.2,-8.6C-57.2,-24.8,-50.4,-40.9,-37.9,-51.5C-25.5,-62,-12.8,-66,-0.6,-65.2C11.6,-64.3,23.2,-58.3,37.8,-49.1Z",
  "M44.6,-54.1C56.1,-42.4,60.8,-24.6,58.8,-8.7C56.8,7.1,47.9,21.8,36.3,33.2C24.7,44.6,10.4,52.7,-4.3,55.5C-19,58.2,-38.1,55.7,-49.6,43.4C-61.2,31.1,-65.1,9.1,-62.1,-12.3C-59.1,-33.8,-49.2,-54,-33.7,-63.3C-18.2,-72.6,1,-71,19.1,-63.6C37.1,-56.1,56.1,-42.8,44.6,-54.1Z",
];

export function DropBlob({
  size,
  duration,
  delay = 0,
  opacity = 0.6,
  color,
  movent,
}: DropBlobProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={movent}
      style={{ position: "absolute", opacity, overflow: "visible" }}
    >
      <motion.path
        fill={color}
        initial={{ d: paths[0] }}
        animate={{ d: paths }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

interface ContentProps {
  title: string;
  content: string;
  className: string;
  colors: string[];
  movent: string;
  icon: React.ReactNode;
}

export default function DropsCard({
  title,
  content,
  className,
  colors,
  movent,
  icon
}: ContentProps) {
  return (
    <div className={`${className} relative overflow-hidden border-[1px] border-[#36415315] rounded-xl`}>
      {/* 1. Fondo radial animado (tailwind.config.ts) */}
      <div className="absolute inset-0" />

      {/* 2. Varios blobs superpuestos */}
      <DropBlob
        size={340}
        duration={8}
        delay={0}
        opacity={0.5}
        color={colors[2]}
        movent={movent}
      />
      <DropBlob
        size={300}
        duration={6}
        delay={1}
        opacity={0.4}
        color={colors[1]}
        movent={movent}
      />
      <DropBlob
        size={260}
        duration={4}
        delay={2}
        opacity={0.3}
        color={colors[0]}
        movent={movent}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mt-[10px] m-1 flex flex-row items-center gap-2">
          {icon}
          <p className="font-black text-lg text-[#36415399]">
            {title}
          </p>
        </div>
        <p className="mx-4 font-sans text-sm text-[#36415385]">
          {content}
        </p>
      </div>

    </div>
  );
}