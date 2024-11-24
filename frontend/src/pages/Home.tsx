import NameFeed from "./name/NameFeed";
import Letters from "../components/Letters";

import useWindowSize from "../hooks/useWindowSize";
import IncreasingNumber from "../components/IncreasingNumber";
import { useNameContext } from "../context/NameContext";

export default function Home() {

    const { searchNameResults: names } = useNameContext()
    const { width } = useWindowSize()

    return (
        <>
            <p style={{fontSize: '2rem', textAlign: 'center'}}>
                Total <IncreasingNumber until={names.length} /> names
            </p>

            { width > 768 && <Letters /> }
            
            <NameFeed title="பெயர்கள்" />
        </>
    )
}