const Error = () => {
  return (
    <>
      <div className="content-wrapper">
        <p>에러가 발생했습니다.</p>
      </div>

      <style jsx>{`
        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        p {
          font-size: 6rem;
        }
      `}</style>
    </>
  );
};

export default Error;
