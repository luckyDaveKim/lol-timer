import React from 'react';
import Spell, { SpellInfo } from './Spell';

const Summoner: React.FC<SummonerInfo & any> = ({
  name,
  spells,
  onClickOfDSpell,
}) => (
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
        onClick={() => {}}
      />
    </div>
  </>
);

export interface SummonerInfo {
  id: string;
  name: string;
  spells: SummonerSpells;
}

interface SummonerSpells {
  spellOfD: SpellInfo;
  spellOfF: SpellInfo;
}

export default Summoner;
