import React, { useEffect, useReducer, useState } from 'react';
import produce from 'immer';
import Summoner, { SummonerInfo } from './Summoner';

const SummonerList: React.FC = () => {
  const [summoners, setSummoners] = useState<Array<SummonerInfo>>([
    {
      id: '1',
      name: '김민규',
      spells: {
        spellOfD: {
          name: 'D 스펠',
          coolDownSeconds: 177,
          leftSeconds: 5,
        },
        spellOfF: {
          name: 'F 스펠',
          coolDownSeconds: 150,
          leftSeconds: 50,
        },
      },
    },
    {
      id: '2',
      name: '김민규',
      spells: {
        spellOfD: {
          name: 'D 스펠',
          coolDownSeconds: 100,
          leftSeconds: 10,
        },
        spellOfF: {
          name: 'F 스펠',
          coolDownSeconds: 150,
          leftSeconds: 50,
        },
      },
    },
  ]);

  type Action = { type: 'COUNT_DOWN' } | { type: 'USE_D_SPELL' };
  const reducer = (
    state: Array<SummonerInfo>,
    action: Action
  ): Array<SummonerInfo> => {
    switch (action.type) {
      case 'COUNT_DOWN':
        console.log('countDown')
        return produce(summoners, (summoners) => {
          summoners
            .map((summoner) => summoner.spells)
            .forEach((spells) => {
              spells.spellOfD.leftSeconds > 0 && spells.spellOfD.leftSeconds--;
              spells.spellOfF.leftSeconds > 0 && spells.spellOfF.leftSeconds--;
            });
        });
      case 'USE_D_SPELL':
        return state;
      default:
        return state;
    }
  };

  const [status, dispatch] = useReducer(reducer, [
    {
      id: '1',
      name: '김민규',
      spells: {
        spellOfD: {
          name: 'D 스펠',
          coolDownSeconds: 177,
          leftSeconds: 5,
        },
        spellOfF: {
          name: 'F 스펠',
          coolDownSeconds: 150,
          leftSeconds: 50,
        },
      },
    },
    {
      id: '2',
      name: '김민규',
      spells: {
        spellOfD: {
          name: 'D 스펠',
          coolDownSeconds: 100,
          leftSeconds: 10,
        },
        spellOfF: {
          name: 'F 스펠',
          coolDownSeconds: 150,
          leftSeconds: 50,
        },
      },
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // setSummoners((summoners) => countDownSpell(summoners));
      dispatch({type: 'COUNT_DOWN'});
      console.log(status)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const countDownSpell: Function = (summoners: Array<SummonerInfo>) => {
    return produce(summoners, (summoners) => {
      summoners
        .map((summoner) => summoner.spells)
        .forEach((spells) => {
          spells.spellOfD.leftSeconds > 0 && spells.spellOfD.leftSeconds--;
          spells.spellOfF.leftSeconds > 0 && spells.spellOfF.leftSeconds--;
        });
    });
  };

  const handleClickOfDSpell: Function = (id: string) => {
    const newSummoners = produce(summoners, (summoners) => {
      const summoner = summoners.find((summoner) => summoner.id === id);
      if (!summoner) {
        return;
      }

      summoner.spells.spellOfD = {
        ...summoner.spells.spellOfD,
        leftSeconds: summoner.spells.spellOfD.coolDownSeconds,
      };
    });

    setSummoners(newSummoners);
  };

  return (
    <>
      {summoners.map(({ id, name, spells }) => (
        <Summoner
          key={id}
          id={id}
          name={name}
          spells={spells}
          onClickOfDSpell={() => handleClickOfDSpell(id)}
        />
      ))}
    </>
  );
};

export default SummonerList;
