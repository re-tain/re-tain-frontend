import React, { useEffect, useState } from "react";
import { getRandomHash } from "../lib/utils";
import { useSearchParams } from "react-router-dom";
import { ArrowPathIcon } from '@heroicons/react/20/solid'

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

            <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border  bg-transparent px-8 py-3 text-base font-medium text-brand hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                onClick={onNext}
            >
                <ArrowPathIcon className="text-brand mr-3 w-6 h-6"></ArrowPathIcon>{" "}
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
