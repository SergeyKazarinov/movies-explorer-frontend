import "./Title.scss";

const Title = ({title}) => {
  return(
    <>
      <h2 className="title">{title}</h2>
      <div className="title__line"></div>
    </>
  )
}

export default Title;
