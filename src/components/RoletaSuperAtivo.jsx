import React, { useRef, useState } from "react";
import styled from "styled-components";
import Colors from "../styles/colors";
import confetti from "canvas-confetti";
import {
  FaRunning,
  FaWater,
  FaAppleAlt,
  FaLaugh,
  FaSnowflake,
} from "react-icons/fa";
import { GiBrain, GiLeg, GiMeditation } from "react-icons/gi";
import { MdOutlineNightsStay, MdFavorite } from "react-icons/md";

const sectors = [
  {
    id: 0,
    icon: <GiBrain size={28} />,
    label: "Mente ativa",
    question: "Qual hormônio é liberado durante o exercício e ajuda no humor?",
    answer: "Endorfina 🧠✨",
  },
  {
    id: 1,
    icon: <MdOutlineNightsStay size={28} />,
    label: "Sono",
    question:
      "Dormir bem é tipo carregar o celular: quanto menos, mais devagar seu músculo cresce. Verdadeiro ou falso?",
    answer: "Verdadeiro! O sono ajuda na recuperação muscular e crescimento.",
  },
  {
    id: 2,
    icon: <MdFavorite size={28} />,
    label: "Coração",
    question: "Qual atividade é melhor pro coração: força ou aeróbico?",
    answer: "Aeróbico (corrida, caminhada, natação...)",
  },
  {
    id: 3,
    icon: <FaRunning size={28} />,
    label: "Corrida",
    question:
      "Verdadeiro ou falso: correr logo após comer é uma boa ideia para queimar mais calorias?",
    answer: "Falso — pode causar desconforto e até náuseas.",
  },
  {
    id: 4,
    icon: <FaWater size={28} />,
    label: "Hidratação",
    question: "O que acontece se você se exercitar sem beber água suficiente?",
    answer: "Fadiga, cãibras e queda de desempenho. 💦",
  },
  {
    id: 5,
    icon: <FaAppleAlt size={28} />,
    label: "Alimentação",
    question: "Qual fruta é conhecida por dar energia rápida antes do treino?",
    answer: "Banana 🍌",
  },
  {
    id: 6,
    icon: <GiMeditation size={28} />,
    label: "Alongamento",
    question:
      "Verdadeiro ou falso: fazer alongamento depois do treino ajuda na recuperação muscular?",
    answer:
      "Verdade! Alongar após o treino ajuda a reduzir a tensão e melhorar a flexibilidade.",
  },
  {
    id: 7,
    icon: <GiLeg size={28} />,
    label: "Força",
    question: "Qual o maior músculo do corpo humano?",
    answer: "Glúteo máximo 🍑",
  },
  {
    id: 8,
    icon: <FaLaugh size={28} />,
    label: "Humor",
    question: "Qual é o aparelho favorito de quem não gosta de treinar? ",
    answer: "O ar-condicionado.😂",
  },
  {
    id: 9,
    icon: <FaSnowflake size={28} />,
    label: "Recuperação",
    question: "Colocar gelo depois do treino ajuda?",
    answer: "Sim — pode diminuir inflamações e ajudar na recuperação. ❄️",
  },
];

const sectorColors = [Colors.primary500, Colors.secondary500];

const WheelWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const WheelStage = styled.div`
  position: relative;
  width: 520px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pointer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%); // invertida
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-top: 35px solid ${Colors.secondary900}; // seta apontando pra baixo
  z-index: 25;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  background: ${Colors.primary500};
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InfoCard = styled.div`
  min-width: 320px;
  max-width: 92vw;
  background: #fff;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  text-align: left;
  margin-top: 16px;
`;

export default function RoletaSuperAtivo() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [currentSector, setCurrentSector] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const audioSpinRef = useRef(null);
  const audioWinRef = useRef(null);

  const SECTOR_COUNT = sectors.length;
  const RADIUS = 250;

  function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setShowAnswer(false);

    const targetIndex = Math.floor(Math.random() * SECTOR_COUNT);
    const anglePerSector = 360 / SECTOR_COUNT;
    const halfSector = anglePerSector / 2;

    const targetAngle = 360 - (targetIndex * anglePerSector + halfSector) - 90;

    const spins = 7 + Math.floor(Math.random() * 6);
    const finalRotation = spins * 360 + targetAngle;

    setRotation(finalRotation);

    if (audioSpinRef.current) {
      audioSpinRef.current.play().catch((err) => {
        console.warn("Erro ao tocar o áudio:", err);
      });
    }
    setTimeout(() => {
      setSpinning(false);
      setCurrentSector(targetIndex);
      confetti({
        particleCount: 80,
        spread: 60,
        startVelocity: 30,
        origin: { y: 0.35 },
      });
    }, 4600);
  }

  function handleShowAnswer() {
    setShowAnswer(true);
    if (audioWinRef.current) audioWinRef.current.play();
  }

  return (
    <WheelWrap>
      {/* Logo no topo esquerdo */}
      <div style={{ position: "absolute", top: 0, left: -180 }}>
        <img
          src="/assets/logo.png"
          alt="SuperATIVO logo"
          style={{ width: 200, height: "auto" }}
        />
      </div>

      <WheelStage>
        <Pointer />
        <svg
          width={RADIUS * 2}
          height={RADIUS * 2}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4.5s cubic-bezier(.2,.9,.2,1)"
              : "none",
            overflow: "visible",
          }}
        >
          {sectors.map((s, i) => {
            const startAngle = (i * 360) / SECTOR_COUNT;
            const endAngle = ((i + 1) * 360) / SECTOR_COUNT;
            const largeArc = endAngle - startAngle > 180 ? 1 : 0;

            const x1 = RADIUS + RADIUS * Math.cos((Math.PI / 180) * startAngle);
            const y1 = RADIUS + RADIUS * Math.sin((Math.PI / 180) * startAngle);
            const x2 = RADIUS + RADIUS * Math.cos((Math.PI / 180) * endAngle);
            const y2 = RADIUS + RADIUS * Math.sin((Math.PI / 180) * endAngle);

            const midAngle = (startAngle + endAngle) / 2;
            const ICON_RADIUS = RADIUS * 0.8; // afasta mais do centro
            const iconX =
              RADIUS + ICON_RADIUS * Math.cos((Math.PI / 180) * midAngle);
            const iconY =
              RADIUS + ICON_RADIUS * Math.sin((Math.PI / 180) * midAngle);

            return (
              <g key={i}>
                <path
                  d={`M${RADIUS} ${RADIUS} L${x1} ${y1} A${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={sectorColors[i % sectorColors.length]}
                  stroke="#444444a0"
                  strokeWidth="1"
                />
                <foreignObject
                  x={iconX - 50}
                  y={iconY - 26}
                  width={100}
                  height={60}
                  style={{ overflow: "visible" }} // <- libera corte
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 600,
                      textAlign: "center",
                      transform: `rotate(${-rotation}deg)`, // <- faz o conteúdo ficar reto
                      transformOrigin: "center center",
                      whiteSpace: "nowrap", // evita quebra de linha cortada
                      overflow: "visible", // deixa o texto “vazar” se precisar
                      fontSize: 12,
                    }}
                  >
                    {s.icon}
                    <div>{s.label}</div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </WheelStage>

      <Controls>
        <Button onClick={handleSpin} disabled={spinning}>
          Girar a Roleta
        </Button>
        <Button
          onClick={() => {
            setCurrentSector(null);
            setShowAnswer(false);
            setRotation(0);
          }}
        >
          Resetar
        </Button>
      </Controls>

      <InfoCard>
        {!currentSector && <div>Gire a roleta e responda a pergunta!</div>}
        {currentSector !== null && (
          <>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              {sectors[currentSector].label}
            </div>
            <div style={{ marginBottom: 8 }}>
              {sectors[currentSector].question}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={handleShowAnswer}>Mostrar resposta</Button>
              <Button
                onClick={() => {
                  setCurrentSector(null);
                  setShowAnswer(false);
                }}
              >
                Próximo giro
              </Button>
            </div>
            {showAnswer && (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 8,
                  background: "#f7f9ff",
                }}
              >
                <strong>Resposta:</strong> {sectors[currentSector].answer}
              </div>
            )}
          </>
        )}
      </InfoCard>

      <audio ref={audioSpinRef} src="/assets/spin2.mp3" preload="auto" />
      <audio ref={audioWinRef} src="/assets/win.mp3" preload="auto" />
    </WheelWrap>
  );
}
