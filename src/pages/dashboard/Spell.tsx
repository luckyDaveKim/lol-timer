import React, {useCallback, useEffect, useRef, useState} from 'react'

const Spell: React.FC<SpellInfo & any> = ({ name, coolDownSeconds, leftSeconds, onClick }) => {
  function useInterval(callback: any, ms: number) {
    const callbackRef: any = useRef(callback)
    const intervalIdRef: any = useRef(null)
    const [delay, setDelay] = useState(ms)

    const clear = useCallback(() => {
      clearInterval(intervalIdRef.current)
    }, [])

    useEffect(() => {
      if (delay !== null) {
        intervalIdRef.current = setInterval(function () {
          callbackRef.current()
        }, delay)
      }

      return clear
    }, [delay])

    return [clear]
  }

  return (
    <>
      <div onClick={() => onClick()}>
        {name}은 {leftSeconds} / {coolDownSeconds} 초 남음 ({Math.ceil(leftSeconds / coolDownSeconds * 100)}%)
      </div>
    </>
  );
}

export interface SpellInfo {
  name: string;
  coolDownSeconds: number;
  leftSeconds: number;
}

export default Spell;
