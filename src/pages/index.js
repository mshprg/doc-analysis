import {useRouter} from "next/router";

function Index() {

    const router = useRouter()

    setTimeout(() => {
        router.push('/documents').then()
    }, 1000)

    return (
        <div>
            
        </div>
    );
}

export default Index;