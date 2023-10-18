import React, { useEffect, useState } from "react";
import { getRandomHash } from "../lib/utils";
import { useSearchParams } from "react-router-dom";

function PrevNextForm({ setHash }) {
    const [searchParams] = useSearchParams();
    const initialHash =
        searchParams.get("hash") || "00000000000000000000000000000000";
    const [history, setHistory] = useState({
        hashes: [initialHash],
        currentHash: 0,
    });

    // only do once on init
    useEffect(() => {
        setHash(initialHash);
    }, []);

    function onNext() {
        let { hashes, currentHash } = history;
        if (currentHash === hashes.length - 1) {
            hashes.push(getRandomHash());
        }
        currentHash += 1;
        setHash(hashes[currentHash]);
        setHistory({ hashes, currentHash });
        setHash(hashes[currentHash]);
    }

    function onPrev() {
        let { hashes, currentHash } = history;
        currentHash = Math.max(currentHash - 1, 0);
        setHistory({ hashes, currentHash });
        setHash(hashes[currentHash]);
    }

    const copyUrlToClipBoard = (e) => {
        e.preventDefault();
        let href = window.location.href;
        href = href.split("?")[0];
        href = href + "?hash=" + history.hashes[history.currentHash];
        navigator.clipboard.writeText(href);
    };

    return (
        <div>

            {/* 

            <button style={{width: '50%'}}
                className="btn btn-default"
                name="prev"
                id="prev"
                onClick={onPrev}
            >
                prev
            </button>
 */}


            <button style={{width: '50%'}}
                className="btn btn-default"
                name="next"
                id="next"
                onClick={onNext}
            >
                Randomize
            </button>

   {/* 
            <button style={{width: '100%'}}
                className="btn btn-default"
                name="copy"
                id="copy"
                onClick={copyUrlToClipBoard}
            >
                Save to Clipboard
            </button>
             */}
        </div>
    );
}

export default PrevNextForm;
