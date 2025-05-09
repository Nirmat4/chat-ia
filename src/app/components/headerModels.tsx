"use client"
import { useState } from "react";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function HeaderModels(){
    return (
        <div>
            <CustomDropdown/>
            
        </div>
    );
}

function User(){
    return (
        <div>
            <div className="rounded-full">J</div>
        </div>
    );
}

interface Model {
    name: string;
    description: string;
}

const models: Model[] = [
    { name: 'DeepSeek-R1', description: 'El especialista en operaciones matemáticas y generación de código fiable.' },
    { name: 'Qwen3', description: 'El políglota que domina más de 100 idiomas sin perder coherencia.' },
    { name: 'Phi-4', description: 'El experto en resolver problemas complejos con precisión.' }
];

function CustomDropdown() {
    const [selected, setSelected] = useState<string>(models[0].name);
    const [open, setOpen] = useState<boolean>(false);

    const selectedModel: Model | undefined = models.find(model => model.name === selected);

    return (
        <div
        className={`relative w-44 m-2 p-2 rounded-lg hover:bg-card hover:shadow-lg ${
            open ? 'bg-card shadow-lg' : ''
        }`}
        >
        <div
            onClick={() => setOpen(prev => !prev)}
            className="flex items-center justify-between text-lg font-black cursor-pointer"
        >
            {selectedModel ? (
            <div>
                <p className="inline">{selectedModel.name}</p>
            </div>
            ) : (
            <p className="text-red-500">Modelo no encontrado</p>
            )}
            <KeyboardArrowDownRoundedIcon />
        </div>

        {open && (
            <ul className="absolute top-full left-0 w-[400px] mt-2 p-2 rounded-lg bg-card shadow-lg z-10 hover:bg-card">
            {models.map((model: Model) => (
                <li
                key={model.name}
                onClick={() => {
                    setSelected(model.name);
                    setOpen(false);
                }}
                className="mb-2 last:mb-0 cursor-pointer"
                >
                <p className="font-bold">{model.name}</p>
                <p className="text-[14px] text-gray-500">{model.description}</p>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}