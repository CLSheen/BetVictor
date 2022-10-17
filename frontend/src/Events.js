import { useEffect, useState } from "react";
import './App.css';
import { useParams } from "react-router-dom";

export default function Events() {
    let params = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sport, setSport] = useState([]);
    const [comp, setComp] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/sports/${params.sportId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setSport(result);
                    setComp(result.comp);
                },
                
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    let content;

    if (error) {
        content = <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        content = <div>Loading...</div>;
      } else {
        content = (
          <>
            {comp.map(item => (
              <div>
                <h2 className="h2">{item.desc}</h2>
                {item.events.map(item => (
                  <a href={`/sports/${params.sportId}/events/${item.id}`} className="category" key={item.id}>
                    {item.desc}
                  </a>
                ))}
              </div>
            ))}
          </>
        );
    }

    return (
        <main className="main">
        <h1 className="h1">{sport.desc} Events</h1>
            {content}
        </main>
    );
  }