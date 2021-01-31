const Loader = ({ label }) => (
    <div>
        <div className="spinner-grow" role="status" />
        <h6 className="mt-4">{label}</h6>
    </div>
)

export default Loader;