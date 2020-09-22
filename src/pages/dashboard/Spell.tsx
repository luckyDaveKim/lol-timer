import React from 'react';

const Spell: React.FC<SpellInfo & any> = ({ name, coolDownSeconds, leftSeconds, onClick }) => (
  <>
    <div onClick={() => onClick()}>
      {name}은 {leftSeconds} / {coolDownSeconds} 초 남음 ({Math.ceil(leftSeconds / coolDownSeconds * 100)}%)
    </div>
  </>
);

export interface SpellInfo {
  name: string;
  coolDownSeconds: number;
  leftSeconds: number;
}

export default Spell;
