const Block = ({text}: {text:string}) => {
    return(
        <div className="box-primary">
            <h3 className="font-main">{text}</h3>
        </div>
    );
};

export default Block;