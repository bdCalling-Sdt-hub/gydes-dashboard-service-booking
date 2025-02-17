const Loading = () => {
  const loaderStyle = {
    width: "44.8px",
    height: "44.8px",
    color: "#0861C5",
    position: "relative",
    background: "radial-gradient(11.2px, currentColor 94%, #0000)",
  };

  const loaderBeforeStyle = {
    content: "''",
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background:
      "radial-gradient(10.08px at bottom right, #0000 94%, currentColor) top left," +
      "radial-gradient(10.08px at bottom left, #0000 94%, currentColor) top right," +
      "radial-gradient(10.08px at top right, #0000 94%, currentColor) bottom left," +
      "radial-gradient(10.08px at top left, #0000 94%, currentColor) bottom right",
    backgroundSize: "22.4px 22.4px",
    backgroundRepeat: "no-repeat",
    animation: "loader 1.5s infinite cubic-bezier(0.3,1,0,1)",
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div style={loaderStyle}>
        <div style={loaderBeforeStyle}></div>

        {/* Keyframes for animation */}
        <style>
          {`
          @keyframes loader {
            33% {
              inset: -11.2px;
              transform: rotate(0deg);
            }
            66% {
              inset: -11.2px;
              transform: rotate(90deg);
            }
            100% {
              inset: 0;
              transform: rotate(90deg);
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Loading;
