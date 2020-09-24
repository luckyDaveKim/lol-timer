import React, {useCallback, useEffect, useRef, useState} from 'react'
import Spell, {SpellInfo} from './Spell'

const Summoner: React.FC<SummonerInfo & any> = ({
                                                  name,
                                                  spells,
                                                  onClickOfDSpell,
                                                  dispatchSummoners
                                                }) => {
  function useInterval(callback: any, ms: number) {
    const callbackRef: any = useRef(callback)
    const intervalIdRef: any = useRef(null)
    const [delay, setDelay] = useState(ms)

    const clear = useCallback(() => {
      console.log('Do Clear!!!')
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

  const [clear] = useInterval(function () {
    dispatchSummoners({type: 'COUNT_DOWN_D_SPELL'})
  }, 1000)

  useEffect(() => {
    if (spells.spellOfD.leftSeconds === 0) {
      clear()
    }

    // return clear()
  }, [spells.spellOfD.leftSeconds])

  return (
    <>
      <div>
        소환사 {name}
        <Spell
          name={spells.spellOfD.name}
          coolDownSeconds={spells.spellOfD.coolDownSeconds}
          leftSeconds={spells.spellOfD.leftSeconds}
          onClick={() => onClickOfDSpell()}
        />
        <Spell
          name={spells.spellOfF.name}
          coolDownSeconds={spells.spellOfF.coolDownSeconds}
          leftSeconds={spells.spellOfF.leftSeconds}
          onClick={() => {
          }}
        />
      </div>
    </>
  )
}

export interface SummonerInfo {
  id: string;
  name: string;
  spells: SummonerSpells;
}

interface SummonerSpells {
  spellOfD: SpellInfo;
  spellOfF: SpellInfo;
}

export default Summoner
