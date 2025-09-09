import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';

function Items() {
  const { items, fetchItems } = useData();
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const rowHeight = 40;
  const containerHeight = 400;
  const buffer = 5;

  useEffect(() => {
    let active = true;

    // Intentional bug: setState called after component unmount if request is slow
    fetchItems(() => active).catch(console.error);

    // Clean‑up to avoid memory leak (candidate should implement)
    return () => {
      active = false;
    };
  }, [fetchItems]);

  if (!items.length) return <p>Loading...</p>;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / rowHeight) - buffer
  );
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + buffer
  );

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{
        height: "400px",
        overflowY: "auto",
        position: "relative",
      }}
      ref={containerRef}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div
        style={{
          height: items.length * rowHeight,
          position: "relative",
        }}
      >
        {visibleItems.map((item, index) => {
          const top = (startIndex + index) * rowHeight;
          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top,
                height: rowHeight,
                left: 0,
                right: 0,
              }}
            >
              <Link to={'/items/' + item.id}>{item.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Items;