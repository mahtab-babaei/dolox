import React, { useCallback, useEffect, useState, useRef } from "react";

const DoubleSlider = ({ min, max, onChange, hideValues }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div dir="ltr" className=" mx-auto ">
      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        step={10}
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />
      {!hideValues ? (
        <>
          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            <div className="slider__left-value font-vazir">10 میلیون</div>
            <div className="slider__right-value font-vazir"> 100000 میلیون</div>
          </div>
          <div className="!bg-transparent text-black pt-10 gap-2 text-sm items-center flex mt-1">
            <div className="!bg-transparent border w-1/2 border-black rounded-md font-vazir p-1 mt">
              {maxVal}
            </div>
            <span className="font-vazir">تا</span>
            <div className="!bg-transparent border w-1/2 border-black rounded-md font-vazir p-1 mt">
              {minVal}
            </div>
            <span className="font-vazir">از</span>
          </div>
        </>
      ) : (
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value font-vazir">{minVal} کیلومتر</div>
          <div className="slider__right-value font-vazir">{maxVal} کیلومتر</div>
        </div>
      )}
    </div>
  );
};

export default DoubleSlider;
