const Error = () => {
  return (
    <>
      <div className="content-wrapper">
        <h1>404</h1>
        <div></div>
        <h3>페이지를 찾지 못했습니다 !</h3>
        <div></div>
      </div>

      <style jsx>{`
        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 200px;
        }

        .content-wrapper div {
          width: 594px;
          height: 1px;
          background-color: #eaeaea;
        }

        h1 {
          font-size: 20em;
          color: #c4c4c4;
        }

        h3 {
          font-size: 3em;
          margin: 10px 0;
          font-weight: normal;
        }
      `}</style>
    </>
  );
};

export default Error;
