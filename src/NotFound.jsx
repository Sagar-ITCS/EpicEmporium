// NotFound.jsx

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "85vh",
        alignItems: "center",
      }}
    >
      <div className="text-xl md:text-3xl text-center p-2">
        <h1>404 - Page Not Found</h1>
        <p className="mt-12">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
