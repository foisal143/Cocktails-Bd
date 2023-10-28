let allData = [];
// load data for cocktails
const loadCoctails = (limit, search) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
    search ? search : 'cock'
  }`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showCoctails(data.drinks, limit);
      const newData = data.drinks;
      allData = [...newData];
    })
    .catch(er => console.log(er));
};
// show datas for cocktails
const showCoctails = (data, limit) => {
  const drinksContainer = document.getElementById('drinksContainer');

  drinksContainer.innerHTML = '';
  // const newData = data.slice(0, limit);

  let newData = [];
  if (limit === undefined) {
    newData = data;
  } else {
    newData = data.slice(0, 6);
  }

  // btn show or hidden logic
  if (limit && data.length > 6) {
    document.getElementById('loadMore').classList.remove('hidden');
  } else {
    document.getElementById('loadMore').classList.add('hidden');
  }
  // condition for search data

  // condition for empty data
  if (data.length === 0 || data === null) {
    document.getElementById('noProduct').innerHTML = `
    <div class="text-center"> <h2 class=" text-4xl"> No Product found </h2> </div>
    `;
    return;
  } else {
    document.getElementById('noProduct').innerHTML = '';
  }
  // loop for data show
  newData.forEach(element => {
    const { strDrinkThumb, strDrink, idDrink, strInstructions } = element;

    drinksContainer.innerHTML += `
        <div>
          <img src="${strDrinkThumb}" alt="">
          <div class="text-end flex justify-between items-center  mt-3 px-8">
          <h2 class" text-2xl font-bold w-fit">${strDrink}</h2>
          <button onclick="loadDetails('${idDrink}'),my_modal_4.showModal()"><i class="fa-regular fa-eye my-0"></i></button>
          
          </div>
        </div>
    `;
  });
};
// show all btn section for cocktails
document.getElementById('loadMore').addEventListener('click', () => {
  const inputValue = document.getElementById('searchInput').value;
  loadCoctails(undefined, inputValue ? inputValue : 'cock');
});

// search drinks section
document.getElementById('searchBtn').addEventListener('click', () => {
  const inputValue = document.getElementById('searchInput').value;
  if (inputValue === '') {
    alert('Please Enter a valid name!');
    return;
  }
  loadCoctails(6, inputValue);
  location.href = '#popularSec';
});
// search by pressing enter key
document.getElementById('searchInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const inputValue = document.getElementById('searchInput').value;
    if (inputValue === '') {
      alert('Please Enter a valid name!');
      return;
    }
    loadCoctails(6, inputValue);
    location.href = '#popularSec';
  }
});
// alcoholic btn section
document.getElementById('alcoholic').addEventListener('click', () => {
  const alcholicAray = [];

  allData.forEach(element => {
    const { strAlcoholic } = element;
    if (strAlcoholic === 'Alcoholic') {
      alcholicAray.push(element);
    }
  });

  showCoctails(alcholicAray);
});

// non alcoholic btn section
document.getElementById('Non_Alcoholic').addEventListener('click', () => {
  const alcholicAray = [];

  allData.forEach(element => {
    const { strAlcoholic } = element;
    if (strAlcoholic === 'Non alcoholic') {
      alcholicAray.push(element);
    }
  });
  showCoctails(alcholicAray);
});

// common function for data loads
const commonFunForData = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => showCoctails(data.drinks));
};
// ordinary data load section
document.getElementById('ordinaryDrink').addEventListener('click', () => {
  commonFunForData(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`
  );
});
// cocktails data show section
document.getElementById('cocktailBtn').addEventListener('click', () => {
  commonFunForData(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`
  );
});

// cocktailsGlass section
document.getElementById('cocktailGlass').addEventListener('click', () => {
  commonFunForData(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`
  );
});

// champagneBtn section
document.getElementById('champagneBtn').addEventListener('click', () => {
  commonFunForData(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute`
  );
});

// load details section
const loadDetails = id => {
  console.log(id);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.drinks[0]));
};
// show details section
const showDetails = element => {
  console.log(element);
  const {
    strInstructionsDE,
    strInstructions,
    strIngredient5,
    strIngredient4,
    strIngredient3,
    strIngredient2,
    strIngredient1,
    strDrinkThumb,
    strDrink,
    strCategory,
    strAlcoholic,
  } = element;
  document.getElementById('detailsBody').innerHTML = `
  <div class="card md:card-side ">
  <figure class="w-full md:w-1/2 flex flex-col gap-3"><img  src="${strDrinkThumb}" alt="Drink"/>
  <h2 class="text-3xl font-semibold px-3">${strDrink}</h2>
  </figure>
  <div class="card-body">
    <div> 
       <p><span class="font-semibold text-xl font-mono">Catagory:</span> ${strCategory}</p>
       <p><span class="font-semibold text-xl font-mono">Alcoholic:</span>  ${
         strAlcoholic === 'Alcoholic' ? 'Yes' : 'No'
       }</p>
       <p><span class="font-semibold text-xl font-mono">Ingradients:</span>  ${strIngredient1}, ${strIngredient2}, ${strIngredient3}, ${strIngredient4}, ${strIngredient5}</p>
       <p><span class="font-semibold text-xl font-mono">Instraction:</span>  ${
         strInstructions ? strInstructions : strInstructionsDE
       }</p>
    </div>
  </div>
</div>
  `;
};
// support section
document.getElementById('support').addEventListener('click', () => {
  const showSupport = document.getElementById('showSupport');
  showSupport.innerText = 'Thanks for supporting!';
  setTimeout(() => {
    showSupport.innerText = '';
  }, 1000);
});
loadCoctails(6, 'cock');
