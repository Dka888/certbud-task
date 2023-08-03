import { useEffect, useState, useMemo } from 'react';
import './App.css';


function App() {
  const [filteredQuery, setFilteredQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => setProducts(res.products))
      .catch(e => setError(true));
  }, [])

  const filteredProduct = useMemo(() => {
    let newProduct = products;

    const trimmedQuery = filteredQuery.trim()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    if (trimmedQuery) {
      newProduct = newProduct.filter((product) => {
        const lowerQuery = trimmedQuery.toLowerCase();

        const title = product.title.toLowerCase();

        return title.includes(lowerQuery);
      });
    }

    return newProduct;

  },[products, filteredQuery]);

  return (
    <div className="max-w-md mx-auto">

      <input
        type="text"
        className="w-full px-4 py-2 mb-4 border "
        placeholder="wpisz filtrowanie tutaj"
        value={filteredQuery}
        onChange={(e) => setFilteredQuery(e.target.value)}
      />


      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Tytuł</th>
            <th className="px-4 py-2">Cena</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {error 
          ? <div>danych nie udało się pobrać</div>
          : filteredProduct.map(product => 
           <tr key={product.id} >
            <td className="px-4 py-2">{product.id}</td>
            <td className="px-4 py-2">{product.title}</td>
            <td className="px-4 py-2">{product.price}</td>
          </tr>
          )}
          </tbody>
        </table>
      </div >
  
  );
}

export default App;
