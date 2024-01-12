import { Link } from "react-router-dom";

import TokenImage from "./TokenImage";

function Box({ artifactUri, displayUri, link, line1, line2 }) {
    return (
        <li key={line1}>
            <a href={link}>
                <TokenImage
                    url={artifactUri}
                    displayUrl={displayUri}
                    strictlyDisplay={true}
                />
            </a>
            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                <a href="/token-detail/KT1G4e969gWPugGZw3apZszC2mvfvykD1S9t/3">
                    {line1}
                </a>
            </h3>
            <p className="text-base leading-7 text-grey-300">{line2}</p>
        </li>

        // <div
        //     style={{
        //         position: "relative",
        //         margin: "10px 30px 20px 0",
        //     }}
        // >
        //     <TokenImage url={artifactUri} displayUrl={displayUri} strictlyDisplay={true}/>

        //     <div
        //         style={{
        //             overflow: "hidden",
        //             whiteSpace: "nowrap",
        //             marginTop: "3px",
        //         }}
        //     >
        //         {line1}
        //     </div>
        //     {line2 && (
        //         <div
        //             style={{
        //                 marginTop: "3px",
        //                 overflow: "hidden",
        //                 whiteSpace: "nowrap",
        //             }}
        //         >
        //             {line2}
        //         </div>
        //     )}
        //     <Link to={link}>
        //         <div
        //             style={{
        //                 position: "absolute",
        //                 top: "0",
        //                 left: "0",
        //                 display: "inline-block",
        //                 height: "100%",
        //                 width: "100%",
        //                 padding: "20px",
        //             }}
        //         ></div>
        //     </Link>
        // </div>
    );
}

export default Box;
