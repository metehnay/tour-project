import React, { useState, useEffect, useRef } from 'react';

interface SliderProps {
  min: number;
  max: number;
  defaultValue?: number;
  onChange: (value: number) => void;
  step?: number;
  valueDisplay?: "text" | "number"
}

const Slider: React.FC<SliderProps> = ({ min, max, defaultValue = min, onChange, step = 1, valueDisplay = "number" }) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [position, setPosition] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const val = ((defaultValue - min) / (max - min)) * 100;
    setPosition(val)

    setValue(defaultValue)
  }, [defaultValue, min, max])


  const handleThumbMove = (e: React.MouseEvent) => {
    e.preventDefault();

    const slider = sliderRef.current;
    if (!slider) return;

    const sliderRect = slider.getBoundingClientRect();
    const sliderWidth = sliderRect.width;

    const startX = e.clientX;
    const startPosition = position;


    const moveAt = (moveX: number) => {
      let newPosition = startPosition + ((moveX - startX) / sliderWidth) * 100;

      newPosition = Math.max(0, Math.min(100, newPosition));

      setPosition(newPosition);

      const newValue = min + (max - min) * (newPosition / 100)
      setValue(newValue)
      onChange(newValue);
    };

    const onMouseMove = (e: MouseEvent) => {
      moveAt(e.clientX);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  let displayValue;

  switch (valueDisplay) {
    case "text":
        const hours = Math.floor(value);
        const minutes = Math.min(59, Math.round((value - hours) * 60));
        displayValue = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      break;
    case "number":
    default:
      displayValue = Math.round(value);
      break;
  }

  const formatMaxValue = () => {
      if (valueDisplay === "text") {
          const hours = Math.floor(max);
          const minutes = 59;
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }
      return max;
  };


  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2" ref={sliderRef}>
      <div
        className="absolute h-full bg-orange-500 rounded-full"
        style={{ left: `0%`, width: `${position}%` }}
      />

      <div
        className="absolute w-4 h-4 bg-white border border-gray-400 rounded-full -mt-1 cursor-grab"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleThumbMove}
      />
      <div className="absolute left-0 top-5 text-gray-500 text-xs">{min}</div>
      <div className="absolute right-0 top-5 text-gray-500 text-xs">{valueDisplay === "text" ? formatMaxValue() : max}</div>
    </div>
  );
};

export default Slider;