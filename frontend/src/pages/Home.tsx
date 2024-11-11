import NameFeed from "./name/NameFeed";
import Letters from "../components/Letters";

import useWindowSize from "../hooks/useWindowSize";

export default function Home() {

    const { width } = useWindowSize()

    return (
        <>
            { width > 768 && <Letters /> }
            <NameFeed title="பெயர்கள்" />
        </>
    )
}