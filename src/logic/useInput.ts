import react, { useState, useEffect } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: ((event: { target: { value: react.SetStateAction<string>; }; }) => {
        setValue(event.target.value);
      })
    }
  };
};

export default useInput;