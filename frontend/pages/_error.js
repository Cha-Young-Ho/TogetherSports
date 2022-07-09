const Error = () => {
  return (
    <>
      <div className="content-wrapper">
        <h1>500</h1>
        <div></div>
        <h3>오류가 발생했습니다. 다시 시도해주세요.</h3>
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
          font-size: 20rem;
          color: #c4c4c4;
        }

        h3 {
          font-size: 3rem;
          margin: 10px 0;
          font-weight: normal;
        }
      `}</style>
    </>
  );
};

export default Error;
