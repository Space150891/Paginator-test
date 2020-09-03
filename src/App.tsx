import React, { useEffect } from 'react';
import './App.css';
import Paginator from './components/Paginator';
import { paginatorStore } from './store/PaginatorStore';

const App: React.FC = () => {
  // find width of all items
  useEffect(() => {
    const elements: any = document.querySelectorAll('.item');
    elements.forEach((el: any) => {
      const elem = el.getBoundingClientRect();
      paginatorStore.getItemCurrentWidth(elem);
    });
  }, []);

  //first screen render
  useEffect(() => {
    paginatorStore.getVisibleItems(false)
  });

  // timeout 
  const debounce = (func: any) => {
    let timer: any;
    return function (event: any) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 500, event);
    };
  }
  // screen resize
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
