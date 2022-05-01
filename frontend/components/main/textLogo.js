const TextLogo = (props) => {
  const color = props.color;
  const divStyle = {
    border: `1px solid ${color}`,
  };

  return (
    <>
      <div style={divStyle}>
        <p style={{ color: color }}>
          <b>To</b>gether <b>S</b>ports
        </p>
      </div>
      <style jsx>{`
        div {
          width: 245px;
          height: 55px;
          padding: 10px;
          border: solid 1px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        p {
          font-size: 2.8rem;
        }
      `}</style>
    </>
  );
};

export default TextLogo;
