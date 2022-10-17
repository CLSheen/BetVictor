import { useEffect, useState } from "react";
import './App.css';
import { useParams } from "react-router-dom";

export default function Outcomes() {
    let params = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]);
    const [markets, setMarkets] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/sports/${params.sportId}/events/${params.eventId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setEvent(result);
                    setMarkets(result.markets);
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
            {markets.map(item => (
              <div>
                <h2 className="h2">{item.desc} - {item.ptdesc} - {item.p}</h2>
                {item.o.map(item => (
                  <div className="category" key={item.id}>
                    {item.d} - {item.keyDimension}
                  </div>
                ))}
              </div>
            ))}
          </>
        );
    }

    return (
        <main className="main">
        <h1 className="h1">{event.desc} Outcomes</h1>
            {content}
        </main>
    );
  }