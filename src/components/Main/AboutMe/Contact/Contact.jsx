import './Contact.scss';

const Contact = ({href, src, alt, text}) => {
  return (
    <a className="link contact__link" href={href} target="_blank">
      <img className="contact__icons" src={src} alt={alt} />
      {text}
    </a>
  )
}

export default Contact;