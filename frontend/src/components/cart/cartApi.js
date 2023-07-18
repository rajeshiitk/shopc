export const addToCart = (item)=>{
  return new Promise(async (resolve,reject)=>{
       const response = await fetch("http://localhost:3000/cart",{
        method:"POST",
        body:JSON.stringify(item),
        headers:{"content-type":"application/json"} 
       });
       
       const data = await response.json();
       resolve({data});

  })
}



export const fetchItemsByUserId = ()=>{
 return new Promise( async (resolve,reject)=>{
    const response = await fetch("http://localhost:3000/cart");
    
    const data = await response.json();
    resolve({data});
  })
}



export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/cart/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/cart/'+itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data:{id:itemId} });
  });
}



export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status:'success'})
  });
}























export function fetchCart(amount = 1) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000') 
    const data = await response.json()
    resolve({data})
  }
  );
}
