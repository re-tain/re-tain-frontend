import { Link } from "react-router-dom";

import TokenImage from "./TokenImage";

function Box({ artifactUri, displayUri, link, line1, line2 }) {
    return (
        <li key={line1}>
            <a href={link}>
                <div className="border border-grey-700  aspect-[1/1] w-full  object-cover">
                    <TokenImage
                        url={artifactUri}
                        displayUrl={displayUri}
                        strictlyDisplay={true}
                    />
                </div>
            </a>
            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                <a href="/token-detail/KT1G4e969gWPugGZw3apZszC2mvfvykD1S9t/3">
                    {line1}
                </a>
            </h3>
            <p className="text-base leading-7 text-grey-300">{line2}</p>
        </li>
    );
}

export default Box;
