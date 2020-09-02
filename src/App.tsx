import React, { useEffect } from 'react';
import './App.css';
import Paginator from './components/Paginator';
import { paginatorStore } from './store/PaginatorStore';

function App() {
  useEffect(() => {
    console.log("HELLO")
    const elements: any = document.querySelectorAll('.item');
    elements.forEach((el: any) => {
      const elem = el.getBoundingClientRect();
      paginatorStore.getItemCurrentWidth(elem);
    });
  }, []);

  useEffect(() => {
    console.log("EFFECT")
    paginatorStore.getVisibleItems(false)
  })

  function debounce(func: any) {
    let timer: any;
    return function (event: any) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 500, event);
    };
  }

  window.addEventListener('resize', debounce((e: any) => {
    paginatorStore.resizeScreenWidth(e);
  }));

  return (
    <div className="App">
      <Paginator />
    </div>
  );
}

export default App;
