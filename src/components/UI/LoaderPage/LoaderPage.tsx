import { FC } from 'react';
import './LoaderPage.scss'

const LoaderPage: FC = () => {
    return (
      <div className='loader'>
        <div className='loader__flex'>
          <div className="loader__container"></div>
        </div>
      </div>
    )
};

export default LoaderPage;
