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

  return (
    <>
      <div>
        {fruitState.map((fruit) => (
          
          fruit.fruit_adet < 5 ?(
            <ul key={fruit.id}>
          <li>{fruit.fruit_name},{fruit.fruit_category},{fruit.fruit_adet}</li>
        </ul>
          ) : null
        ))}
      </div>
    </>
  )
}