import { useEffect, useState } from 'react';
import { supabase } from '../SupaClient';
import { Route, Routes, Link } from 'react-router-dom';


interface FruitFormData {
  fruitName: string;
  fruitCount: number;
  fruitCategory: string;
}

export default function Form() {
  const [fruit, setFruit] = useState<FruitFormData>({});

  const submitFruitForm =  async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

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
        if(error){
          console.log("hata", error);
        }
    }
  useEffect(() => {
    console.log(fruit);
    insertFruit();
  },[fruit])

  return (
    <>
      <div className="container">
        <div className="full-height row justify-content-center align-items-center">
          <h2 className='text-center'>Ürün Kaydı Gir</h2>
          <div className="col-xl-6">
            <form onSubmit={submitFruitForm} className='d-flex flex-column form-gap'>
                  <input type="text" name="fruitName" placeholder="Meyve Adı" />
                  <input type="number" name="fruitCount" placeholder="Meyve Adedi" />
                  <select name="fruitCategory">
                    <option value="Sebze">Sebze</option>
                    <option value="Meyve">Meyve</option>
                  </select>
                  <input type="submit" value="Gönder!" />
            </form>
            <Link to="/products">Ürünlere Git</Link>
          </div>
        </div>
      </div>
    </>
  );
}