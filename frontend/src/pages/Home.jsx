import Main from "../components/Main/Main";
import { useUser } from "../context/UserContext";

export default function Home() {
    const { logout } = useUser();

    return (
        <>
            <div className="App-top">
                <div className="App-title">
                    <h1>Note-taking App</h1>
                    <h3>By Juan Alva</h3>
                </div>
                <button
                    className="logout-button"
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </button>
            </div>

            <Main />
        </>
    );
}
