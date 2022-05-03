const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="bg-container">
          <div className="footer">
            <div className="category">
              <li>고객센터</li>
              <li>문의</li>
              <li>Team</li>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        * {
          font-weight: bold;
          font-size: 1.5rem;
        }

        .footer-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .bg-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.16);
          width: 100%;
          height: 450px; // 이 값은 main3에서도 쓰이기 때문에 바꾸면 안됨
          max-width: 1920px;
        }

        .footer {
          width: 80%;
          min-width: 1000px;
          height: 90%;
        }

        .category {
          display: flex;
        }

        li {
          padding: 10px;
          margin-left: 100px;
        }
      `}</style>
    </>
  );
};

export default Footer;
