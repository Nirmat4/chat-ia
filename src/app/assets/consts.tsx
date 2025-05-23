import React from "react";
import JoinInnerOutlinedIcon from "@mui/icons-material/JoinInnerOutlined";
import TextRotationAngleupOutlinedIcon from "@mui/icons-material/TextRotationAngleupOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";


type MoventType = keyof typeof movents;
interface Task {
  name: string;
  description: string;
  colors: string[];
  movent: string;
  icon: React.ReactNode;
}

interface Model {
  name: string;
  description: string;
  icon: React.ReactNode;
  colors: string[];
  movent: MoventType;
}

const style = { color: "#36415395", fontSize: 20 };
export const tasks: Task[] = [
  {
    name: "Busqueda SQL",
    description: "Va directo al dato, sin rodeos ni dramas.",
    colors: ["#5900E090", "#0F00E090", "#00C6E090"],
    movent: "-70 -70 250 250",
    icon: <JoinInnerOutlinedIcon style={style} />,
  },
  {
    name: "Busca Semantica",
    description: "Entiende lo que quieres, no solo lo que dices.",
    colors: ["#01E01190", "#A9E00090", "#00E0A790"],
    movent: "-100 0 200 200",
    icon: <TextRotationAngleupOutlinedIcon style={style} />,
  },
  {
    name: "Conexion Jira",
    description: "Mantiene tus tareas y tus nervios bajo control.",
    colors: ["#0300E090", "#9701E190", "#DF00E090"],
    movent: "-50 -50 300 300",
    icon: <EmojiObjectsOutlinedIcon style={style} />,
  },
  {
    name: "Validaciones",
    description: "Genera validacions, cumple la ley... en tus reportes.",
    colors: ["#E03A0090", "#E1860090", "#E0BD0090"],
    movent: "-100 -30 300 300",
    icon: <FlagCircleOutlinedIcon style={style} />,
  },
];

const movents = {
  a: ["0% 50%", "50% 0%", "100% 50%", "50% 100%", "0% 50%"],
  b: ["25% 75%", "75% 75%", "75% 25%", "25% 25%", "25% 75%"],
  c: ["0% 0%", "100% 0%", "0% 100%", "100% 100%", "0% 0%"],
};
export const models: Model[] = [
  {
    name: "Qwen3",
    description:
      "El políglota que domina más de 100 idiomas sin perder coherencia.",
    icon: <AutoAwesomeRoundedIcon />,
    colors: ["#8E00E0", "#A52CDB", "#322CDB"],
    movent: "a",
  },
  {
    name: "DeepSeek-R1",
    description:
      "El especialista en operaciones matemáticas y generación de código fiable.",
    icon: <BubbleChartRoundedIcon />,
    colors: ["#00DAE1", "#2B37E0", "#A700E0"],
    movent: "b",
  },
  {
    name: "Phi-4",
    description: "El experto en resolver problemas complejos con precisión.",
    icon: <ApiRoundedIcon />,
    colors: ["#00A8E0", "#00E0A2", "#E0DE01"],
    movent: "c",
  },
];