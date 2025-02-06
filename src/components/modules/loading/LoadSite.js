import React from "react";

const LoadSite = () => {
  return (
    <div className="skeleton-container">
      <span className="skeleton skeleton-avatar"></span>
      <span className="skeleton skeleton-title"></span>

      <style jsx>{`
        .skeleton-container {
          width: 100%;
          padding: 0 1rem;
          height: 50px;
          background: #ffffff;
           {
            /* border-radius: 8px; */
          }
           {
            /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
          }
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border: 1px solid var(--twitter_dark_7);
          border-top: none;
        }

        .skeleton {
          display: flex;
          height: 20px;
          background: linear-gradient(
            90deg,
            #e0e0e0 25%,
            #f0f0f0 50%,
            #e0e0e0 75%
          );
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s infinite;
        }

        .skeleton-title {
          width: 20%;
          height: 24px;
        }

        .skeleton-text {
          width: 100%;
          height: 16px;
          margin-bottom: 8px;
        }

        .skeleton-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 16px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadSite;
