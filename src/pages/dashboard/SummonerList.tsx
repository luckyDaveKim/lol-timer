import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react'
import produce from 'immer'
import Summoner, {SummonerInfo} from './Summoner'
import {SpellInfo} from './Spell'

const SummonerList: React.FC = () => {
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

  type Action = { type: 'COUNT_DOWN_D_SPELL' } | { type: 'USE_D_SPELL', id: string };
  const reducer = (
    summoners: Array<SummonerInfo>,
    action: Action
  ): Array<SummonerInfo> => {
    switch (action.type) {
      case 'COUNT_DOWN_D_SPELL':
        console.log('countDown reducer')
        return produce(summoners, (draftSummoners) => {
          draftSummoners
            .map((summoner) => summoner.spells)
            .forEach((spells) => {
              spells.spellOfD.leftSeconds > 0 && spells.spellOfD.leftSeconds--
            })
        })
      case 'USE_D_SPELL':
        return produce(summoners, (draftSummoners) => {
          const summoner = draftSummoners.find((summoner) => summoner.id === action.id)

          /* 소환사 확인 */
          if (!summoner) {
            return
          }

          const spellOfD = summoner.spells.spellOfD
          /* 스펠 사용 가능여부 확인 */
          const usableSpell = spellOfD.leftSeconds === 0
          if (!usableSpell) {
            return
          }

          spellOfD.leftSeconds = spellOfD.coolDownSeconds
        })
      default:
        return summoners
    }
  }

  const [summoners, dispatchSummoners] = useReducer(reducer, [
    {
      id: '1',
      name: '김민규',
      spells: {
        spellOfD: {
          name: 'D 스펠',
          coolDownSeconds: 177,
          leftSeconds: 3
        },
        spellOfF: {
          name: 'F 스펠',
          coolDownSeconds: 150,
          leftSeconds: 50
        }
      }
    },
    {
      id: '2',
      name: '김민규',
      spells: {
        spellOfD: {
          name: 'D 스펠',
          coolDownSeconds: 100,
          leftSeconds: 10
        },
        spellOfF: {
          name: 'F 스펠',
          coolDownSeconds: 150,
          leftSeconds: 50
        }
      }
    }
  ])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setSummoners((summoners) => countDownSpell(summoners));
  //     dispatchSummoners({type: 'COUNT_DOWN'});
  //     console.log(status)
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // const countDownSpell: Function = (summoners: Array<SummonerInfo>) => {
  //   return produce(summoners, (summoners) => {
  //     summoners
  //       .map((summoner) => summoner.spells)
  //       .forEach((spells) => {
  //         spells.spellOfD.leftSeconds > 0 && spells.spellOfD.leftSeconds--;
  //         spells.spellOfF.leftSeconds > 0 && spells.spellOfF.leftSeconds--;
  //       });
  //   });
  // };

  const getSummonerById = (id: string): SummonerInfo | undefined => {
    return summoners.find((summoner) => summoner.id === id)
  }

  const getSummonerSpellOfDById = (id: string): SpellInfo | undefined => {
    return getSummonerById(id)?.spells.spellOfD
  }

  const handleClickOfDSpell: Function = (id: string) => {
    // dispatchSummoners({type: 'USE_D_SPELL', id})
    console.log(getSummonerSpellOfDById(id)?.leftSeconds)

    // useInterval(() => {
    //   console.log('countDown interval')
    //   console.log(getSummonerSpellOfDById(id)?.leftSeconds)
    //   dispatchSummoners({type: 'COUNT_DOWN_D_SPELL'})
    //
    //   console.log(getSummonerSpellOfDById(id))
    //   const isSpellTimeOut = !getSummonerSpellOfDById(id)?.leftSeconds
    //   if (isSpellTimeOut) {
    //     console.log('spell timeout')
    //     // clearInterval(countDownSpellInterval)
    //   }
    // }, 1000)
  }

  return (
    <>
      {summoners.map(({id, name, spells}) => (
        <Summoner
          key={id}
          id={id}
          name={name}
          spells={spells}
          onClickOfDSpell={() => handleClickOfDSpell(id)}
          dispatchSummoners={dispatchSummoners}
        />
      ))}
    </>
  )
}

export default SummonerList
