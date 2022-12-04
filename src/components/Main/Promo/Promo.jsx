import { memo } from 'react';
import NavTab from './NavTab/NavTab';
import './Promo.scss';

const Promo = () => {
  return(
    <section className='promo'>
      <h1 className='promo__title'>Сергей Казаринов</h1>
      <h2 className='promo__subtitle'>Frontend-developer</h2>
      <NavTab />
    </section>
  );
}

export default memo(Promo);