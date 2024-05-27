
const HeightWrapper = ({dir = "column", children}) => {
    return (
        <div
            className="height"
            style={{display: 'flex', flexDirection: dir}}
        >
            {children}
        </div>
    );
};

export default HeightWrapper;