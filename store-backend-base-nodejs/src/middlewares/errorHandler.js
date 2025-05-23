const errorHandler = (err, req, res) => {
    console.error("Error:", err.message);
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: err.message || "Error interno del servidor",
    });
};

export default errorHandler;