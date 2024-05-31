import { useEffect, useState } from 'react';
import { supabase } from '../SupaClient';

interface FruitFormData {
  fruitName: string;
  fruitCount: number;
  fruitCategory: string;
}

export default function Form() {
  const [fruit, setFruit] = useState({});

  const submitFruitForm =  async(e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const fruitData: FruitFormData = {
      fruitName: data.get('fruitName') as string,
      fruitCount: parseInt(data.get('fruitCount') as string, 10),
      fruitCategory: data.get('fruitCategory') as string,
    };
    setFruit(fruitData);
    }

    const insertFruit = async() => {
      const { error } = await supabase
      .from('fruit')
      .insert({ 
        fruit_name:fruit.fruitName,
        fruit_category:fruit.fruitCategory,
        fruit_adet:fruit.fruitCount
        })
    }
  useEffect(() => {
    console.log(fruit);
    insertFruit();
  },[fruit])

  return (
    <>
      <form onSubmit={submitFruitForm}>
        <input type="text" name="fruitName" placeholder="Meyve Adı" />
        <input type="number" name="fruitCount" placeholder="Meyve Adedi" />
        <select name="fruitCategory">
          <option value="Sebze">Sebze</option>
          <option value="Meyve">Meyve</option>
        </select>
        <input type="submit" value="Gönder!" />
      </form>
    </>
  );
}
