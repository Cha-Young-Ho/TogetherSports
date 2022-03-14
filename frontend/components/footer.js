const Footer = () => {
  return (
    <>
      <div className="bg-container">
        <div className="footer-wrapper">
          <div className="category">
            <li>고객센터</li>
            <li>문의</li>
            <li>Team</li>
          </div>
        </div>
      </div>
      <style jsx>{`
        * {
          font-weight: bold;
          font-size: 1.5rem;
        }

        .bg-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.16);
          width: 100%;
          height: 450px;
        }

        .footer-wrapper {
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
