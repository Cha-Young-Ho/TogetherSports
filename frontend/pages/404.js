const NotFound = () => {
  return (
    <>
      <div className="content-wrapper">
        <p>404 NOT FOUND</p>
        <p>해당 페이지를 찾을 수 없습니다.</p>
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

export default NotFound;
