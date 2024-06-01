import { supabase } from '../SupaClient';
import { useEffect, useState } from 'react'


interface Fruit {
  id:number,
  fruit_name:string,
  fruit_category:string,
  fruit_adet:number
}
export default function Products(){
  const [fruitState, selectFruitState] = useState<Fruit[]>([])
  const [searchState, setSearchState] = useState("")

  const selectFruit = async() => {
    const { data, error } = await supabase
    .from('fruit')
    .select()
    if(error){
      console.log("Hata", error);
    }
    else{
      selectFruitState(data)
    }
  }

  useEffect(()=>{
  selectFruit()
  
  },[])

  const fruitStates = fruitState.filter(fruit => 
      fruit.fruit_name.toLowerCase().includes(searchState.toLowerCase()) || fruit.fruit_category.toLowerCase().includes(searchState.toLowerCase())
  )

  return (
    <>
    <input type="text" onChange={(e) => setSearchState(e.target.value)} placeholder='Meyve Ara'/>
      <div>
      {
        fruitStates.length > 0 ? (
          fruitStates.map((fruit) => (
          <ul key={fruit.id}>
            <li>{fruit.fruit_name}, {fruit.fruit_category}, {fruit.fruit_adet}</li>
          </ul>
          ))
        ) : <p>Meyve Bulunamadı</p>
      }
      </div>
    </>
  )
}