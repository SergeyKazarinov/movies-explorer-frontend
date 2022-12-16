import { FC } from 'react';
import './Contact.scss';

interface IContact {
  href: string;
  src: string;
  alt: string;
  text: string;
}

const Contact: FC<IContact> = ({href, src, alt, text}) => {
  return (
    <a className="link contact__link" href={href} target="_blank">
      <img className="contact__icons" src={src} alt={alt} />
      {text}
    </a>
  )
}

export default Contact;