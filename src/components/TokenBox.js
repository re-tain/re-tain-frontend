function TokenBox({ title }) {
    return (
        <div style={
            {
                margin: '30px',
                width: 'min(20vw, 300px)',
                height: 'min(20vw, 300px)',
                padding: '10px'
            }
        }>
        <iframe
            style={{
                border: "None",
                height: '100%',
                width: '100%'
            }}
            src="https://pifragile.com/ab0/"
        ></iframe>
        <div style= {
            {
                marginTop: '3px'
            }
        }>{title}</div>
        </div>
    );
}

export default TokenBox;
