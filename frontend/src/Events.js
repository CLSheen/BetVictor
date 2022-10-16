import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './App.css';

export default function Events() {
    let params = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/sports/" + params.sportId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
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
            {items.map(item => (
              <a href={`/sports/${item.id}`} className="category" key={item.id}>
                {item.desc}
              </a>
            ))}
          </>
        );
    }

    return (
        <main className="main">
        <h1 className="h1">Sports</h1>
            {content}
        </main>
    );
  }